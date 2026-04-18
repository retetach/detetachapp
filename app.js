(function () {
    'use strict';

    const STORAGE_KEY = 'sitewalk_data_v1';
    const MAX_IMG_DIM = 1600;
    const IMG_QUALITY = 0.78;

    let state = loadState();
    let editingDefectId = null;
    let editingPhotos = [];

    function loadState() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (raw) return JSON.parse(raw);
        } catch (e) {
            console.warn('Failed to load state', e);
        }
        return {
            project: {
                name: '', address: '', client: '', architect: '',
                date: new Date().toISOString().slice(0, 10),
                ref: ''
            },
            defects: []
        };
    }

    function saveState() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }

    function uid() {
        return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
    }

    function $(sel) { return document.querySelector(sel); }
    function $$(sel) { return Array.from(document.querySelectorAll(sel)); }

    // ---------- TABS ----------
    $$('.tab').forEach(tab => {
        tab.addEventListener('click', () => {
            $$('.tab').forEach(t => t.classList.remove('active'));
            $$('.view').forEach(v => v.classList.remove('active'));
            tab.classList.add('active');
            $('#view-' + tab.dataset.view).classList.add('active');
        });
    });

    // ---------- PROJECT ----------
    function renderProject() {
        const p = state.project;
        $('#proj-name').value = p.name || '';
        $('#proj-address').value = p.address || '';
        $('#proj-client').value = p.client || '';
        $('#proj-architect').value = p.architect || '';
        $('#proj-date').value = p.date || '';
        $('#proj-ref').value = p.ref || '';
    }

    $('#project-form').addEventListener('submit', (e) => {
        e.preventDefault();
        state.project = {
            name: $('#proj-name').value.trim(),
            address: $('#proj-address').value.trim(),
            client: $('#proj-client').value.trim(),
            architect: $('#proj-architect').value.trim(),
            date: $('#proj-date').value,
            ref: $('#proj-ref').value.trim()
        };
        saveState();
        const msg = $('#project-saved');
        msg.textContent = 'Saved \u2713';
        setTimeout(() => { msg.textContent = ''; }, 1800);
    });

    // ---------- DEFECT LIST ----------
    function renderDefectList() {
        const list = $('#defect-list');
        $('#defect-count').textContent = state.defects.length;
        if (state.defects.length === 0) {
            list.innerHTML = '<p class="empty-state">No defects recorded yet. Tap <strong>+ New defect</strong> to add one.</p>';
            return;
        }
        list.innerHTML = '';
        state.defects.forEach((d, idx) => {
            const card = document.createElement('div');
            card.className = 'defect-card';
            card.dataset.severity = d.severity;
            const thumb = (d.photos && d.photos[0])
                ? `<div class="defect-thumb" style="background-image:url('${d.photos[0].data}')"></div>`
                : `<div class="defect-thumb">No<br>photo</div>`;
            card.innerHTML = `
                ${thumb}
                <div class="defect-body">
                    <h3>${escapeHtml(d.title || '(Untitled)')}</h3>
                    <div class="defect-meta">
                        <span class="sev-tag ${d.severity}">${d.severity}</span>
                        <span>#${idx + 1}</span>
                        ${d.location ? `<span>\u2022 ${escapeHtml(d.location)}</span>` : ''}
                        ${d.trade ? `<span>\u2022 ${escapeHtml(d.trade)}</span>` : ''}
                        <span>\u2022 ${d.photos ? d.photos.length : 0} photo${(d.photos && d.photos.length === 1) ? '' : 's'}</span>
                    </div>
                    <div class="defect-desc">${escapeHtml(d.description || '')}</div>
                </div>
            `;
            card.addEventListener('click', () => openDefectModal(d.id));
            list.appendChild(card);
        });
    }

    function escapeHtml(s) {
        return String(s).replace(/[&<>"']/g, c => ({
            '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
        }[c]));
    }

    // ---------- DEFECT MODAL ----------
    const modal = $('#defect-modal');

    function openDefectModal(id) {
        editingDefectId = id || null;
        editingPhotos = [];
        const form = $('#defect-form');
        form.reset();

        if (id) {
            const d = state.defects.find(x => x.id === id);
            if (!d) return;
            $('#defect-modal-title').textContent = 'Edit defect';
            $('#d-title').value = d.title || '';
            $('#d-location').value = d.location || '';
            $('#d-severity').value = d.severity || 'Medium';
            $('#d-trade').value = d.trade || '';
            $('#d-description').value = d.description || '';
            $('#d-comments').value = d.comments || '';
            editingPhotos = (d.photos || []).map(p => ({ ...p }));
            $('#btn-delete-defect').classList.remove('hidden');
        } else {
            $('#defect-modal-title').textContent = 'New defect';
            $('#d-severity').value = 'Medium';
            $('#btn-delete-defect').classList.add('hidden');
        }
        renderPhotoThumbs();
        modal.classList.remove('hidden');
        setTimeout(() => $('#d-title').focus(), 50);
    }

    function closeDefectModal() {
        modal.classList.add('hidden');
        editingDefectId = null;
        editingPhotos = [];
    }

    $('#btn-add-defect').addEventListener('click', () => openDefectModal(null));
    $('#btn-close-modal').addEventListener('click', closeDefectModal);
    $('#btn-cancel-defect').addEventListener('click', closeDefectModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeDefectModal();
    });

    $('#defect-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const data = {
            title: $('#d-title').value.trim(),
            location: $('#d-location').value.trim(),
            severity: $('#d-severity').value,
            trade: $('#d-trade').value.trim(),
            description: $('#d-description').value.trim(),
            comments: $('#d-comments').value.trim(),
            photos: editingPhotos
        };
        if (editingDefectId) {
            const idx = state.defects.findIndex(x => x.id === editingDefectId);
            if (idx >= 0) state.defects[idx] = { ...state.defects[idx], ...data };
        } else {
            state.defects.push({
                id: uid(),
                createdAt: new Date().toISOString(),
                ...data
            });
        }
        saveState();
        renderDefectList();
        closeDefectModal();
    });

    $('#btn-delete-defect').addEventListener('click', () => {
        if (!editingDefectId) return;
        if (!confirm('Delete this defect? This cannot be undone.')) return;
        state.defects = state.defects.filter(d => d.id !== editingDefectId);
        saveState();
        renderDefectList();
        closeDefectModal();
    });

    // ---------- PHOTOS ----------
    $('#photo-input').addEventListener('change', async (e) => {
        const files = Array.from(e.target.files || []);
        for (const f of files) {
            try {
                const dataUrl = await resizeImage(f);
                editingPhotos.push({ id: uid(), data: dataUrl, name: f.name });
            } catch (err) {
                console.error('Photo error', err);
                alert('Could not process photo: ' + (err.message || err));
            }
        }
        e.target.value = '';
        renderPhotoThumbs();
    });

    function renderPhotoThumbs() {
        const wrap = $('#photo-thumbs');
        $('#photo-count').textContent = editingPhotos.length;
        wrap.innerHTML = '';
        editingPhotos.forEach((p, idx) => {
            const div = document.createElement('div');
            div.className = 'photo-thumb';
            div.style.backgroundImage = `url('${p.data}')`;
            div.innerHTML = `<button type="button" class="remove" data-idx="${idx}" aria-label="Remove photo">&times;</button>`;
            div.querySelector('.remove').addEventListener('click', (ev) => {
                ev.stopPropagation();
                editingPhotos.splice(idx, 1);
                renderPhotoThumbs();
            });
            wrap.appendChild(div);
        });
    }

    function resizeImage(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                const img = new Image();
                img.onload = () => {
                    let { width, height } = img;
                    const ratio = Math.min(1, MAX_IMG_DIM / Math.max(width, height));
                    width = Math.round(width * ratio);
                    height = Math.round(height * ratio);
                    const canvas = document.createElement('canvas');
                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);
                    resolve(canvas.toDataURL('image/jpeg', IMG_QUALITY));
                };
                img.onerror = () => reject(new Error('Invalid image'));
                img.src = reader.result;
            };
            reader.onerror = () => reject(new Error('Could not read file'));
            reader.readAsDataURL(file);
        });
    }

    // ---------- DATA MGMT ----------
    $('#btn-backup').addEventListener('click', () => {
        const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `sitewalk-${(state.project.ref || 'backup')}-${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);
    });

    $('#import-file').addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        try {
            const text = await file.text();
            const data = JSON.parse(text);
            if (!data.project || !Array.isArray(data.defects)) throw new Error('Invalid backup');
            if (!confirm('Replace current data with imported backup?')) return;
            state = data;
            saveState();
            renderAll();
            alert('Backup imported.');
        } catch (err) {
            alert('Could not import: ' + err.message);
        }
        e.target.value = '';
    });

    $('#btn-clear').addEventListener('click', () => {
        if (!confirm('This will delete all project details and defects. Continue?')) return;
        localStorage.removeItem(STORAGE_KEY);
        state = loadState();
        renderAll();
    });

    // ---------- PDF EXPORT ----------
    $('#btn-export-pdf').addEventListener('click', async () => {
        const status = $('#export-status');
        try {
            status.textContent = 'Generating PDF...';
            await generatePdf({
                cover: $('#opt-cover').checked,
                summary: $('#opt-summary').checked,
                photos: $('#opt-photos').checked
            });
            status.textContent = 'PDF generated \u2713';
        } catch (err) {
            console.error(err);
            status.textContent = 'Failed: ' + err.message;
        }
    });

    async function generatePdf(opts) {
        if (!window.jspdf) throw new Error('jsPDF not loaded');
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF({ unit: 'pt', format: 'a4' });

        const page = { w: doc.internal.pageSize.getWidth(), h: doc.internal.pageSize.getHeight() };
        const margin = 48;
        const contentW = page.w - margin * 2;
        const p = state.project;
        const defects = state.defects;

        const drawFooter = (pageNum) => {
            doc.setFontSize(9);
            doc.setTextColor(120);
            const label = `${p.name || 'Defect Report'}${p.ref ? ' \u2022 ' + p.ref : ''}`;
            doc.text(label, margin, page.h - 20);
            doc.text('Page ' + pageNum, page.w - margin, page.h - 20, { align: 'right' });
        };

        let pageNum = 1;

        // Cover page
        if (opts.cover) {
            doc.setFillColor(31, 58, 95);
            doc.rect(0, 0, page.w, 220, 'F');
            doc.setTextColor(255);
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(28);
            doc.text('Defect Report', margin, 110);
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(14);
            doc.text(p.name || '(Unnamed project)', margin, 145);
            if (p.ref) {
                doc.setFontSize(11);
                doc.text('Ref: ' + p.ref, margin, 168);
            }

            doc.setTextColor(30);
            let y = 270;
            doc.setFontSize(11);
            const detail = (label, val) => {
                if (!val) return;
                doc.setFont('helvetica', 'bold');
                doc.text(label, margin, y);
                doc.setFont('helvetica', 'normal');
                const lines = doc.splitTextToSize(String(val), contentW - 120);
                doc.text(lines, margin + 120, y);
                y += 16 * lines.length + 4;
            };
            detail('Site address:', p.address);
            detail('Client:', p.client);
            detail('Architect:', p.architect);
            detail('Inspection date:', p.date);
            detail('Defects recorded:', defects.length);
            detail('Report generated:', new Date().toLocaleString());

            drawFooter(pageNum);
        }

        // Summary page
        if (opts.summary && defects.length > 0) {
            if (opts.cover) { doc.addPage(); pageNum++; }
            doc.setTextColor(30);
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(16);
            doc.text('Summary', margin, margin + 8);
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(10);

            const counts = defects.reduce((a, d) => { a[d.severity] = (a[d.severity] || 0) + 1; return a; }, {});
            const sevText = ['Critical', 'High', 'Medium', 'Low']
                .map(s => `${s}: ${counts[s] || 0}`).join('   ');
            doc.text(sevText, margin, margin + 32);

            // Table
            let y = margin + 60;
            const cols = [
                { label: '#', w: 30 },
                { label: 'Title', w: 180 },
                { label: 'Location', w: 120 },
                { label: 'Severity', w: 70 },
                { label: 'Trade', w: 100 }
            ];
            doc.setFont('helvetica', 'bold');
            doc.setFillColor(240, 242, 245);
            doc.rect(margin, y - 14, contentW, 22, 'F');
            let x = margin + 6;
            cols.forEach(c => { doc.text(c.label, x, y); x += c.w; });
            y += 10;
            doc.setFont('helvetica', 'normal');

            defects.forEach((d, idx) => {
                if (y > page.h - margin - 40) {
                    drawFooter(pageNum);
                    doc.addPage(); pageNum++;
                    y = margin + 20;
                }
                x = margin + 6;
                const row = [
                    String(idx + 1),
                    d.title || '(Untitled)',
                    d.location || '-',
                    d.severity,
                    d.trade || '-'
                ];
                row.forEach((txt, i) => {
                    const lines = doc.splitTextToSize(String(txt), cols[i].w - 8);
                    doc.text(lines, x, y);
                    x += cols[i].w;
                });
                y += 18;
                doc.setDrawColor(230);
                doc.line(margin, y - 6, margin + contentW, y - 6);
            });

            drawFooter(pageNum);
        }

        // Each defect
        for (let i = 0; i < defects.length; i++) {
            const d = defects[i];
            doc.addPage(); pageNum++;
            doc.setTextColor(30);

            // Severity banner
            const sevColor = severityColor(d.severity);
            doc.setFillColor(sevColor[0], sevColor[1], sevColor[2]);
            doc.rect(0, 0, page.w, 6, 'F');

            doc.setFont('helvetica', 'bold');
            doc.setFontSize(11);
            doc.setTextColor(sevColor[0], sevColor[1], sevColor[2]);
            doc.text(`Defect ${i + 1} of ${defects.length} \u2022 ${d.severity.toUpperCase()}`, margin, margin);

            doc.setTextColor(30);
            doc.setFontSize(16);
            const titleLines = doc.splitTextToSize(d.title || '(Untitled defect)', contentW);
            doc.text(titleLines, margin, margin + 22);
            let y = margin + 22 + titleLines.length * 18;

            doc.setFont('helvetica', 'normal');
            doc.setFontSize(10);
            const metaParts = [];
            if (d.location) metaParts.push('Location: ' + d.location);
            if (d.trade) metaParts.push('Trade: ' + d.trade);
            if (d.createdAt) metaParts.push('Recorded: ' + new Date(d.createdAt).toLocaleString());
            if (metaParts.length) {
                doc.setTextColor(100);
                const metaLines = doc.splitTextToSize(metaParts.join('   \u2022   '), contentW);
                doc.text(metaLines, margin, y);
                y += metaLines.length * 14 + 6;
                doc.setTextColor(30);
            }

            const section = (label, text) => {
                if (!text) return;
                if (y > page.h - margin - 60) {
                    drawFooter(pageNum);
                    doc.addPage(); pageNum++;
                    y = margin;
                }
                doc.setFont('helvetica', 'bold');
                doc.setFontSize(11);
                doc.text(label, margin, y);
                y += 14;
                doc.setFont('helvetica', 'normal');
                doc.setFontSize(10);
                const lines = doc.splitTextToSize(text, contentW);
                lines.forEach(line => {
                    if (y > page.h - margin - 30) {
                        drawFooter(pageNum);
                        doc.addPage(); pageNum++;
                        y = margin;
                    }
                    doc.text(line, margin, y);
                    y += 14;
                });
                y += 6;
            };

            section('Description', d.description);
            section('Comments / recommended action', d.comments);

            // Photos
            if (opts.photos && d.photos && d.photos.length > 0) {
                if (y > page.h - margin - 60) {
                    drawFooter(pageNum);
                    doc.addPage(); pageNum++;
                    y = margin;
                }
                doc.setFont('helvetica', 'bold');
                doc.setFontSize(11);
                doc.text(`Photos (${d.photos.length})`, margin, y);
                y += 12;

                const photoW = (contentW - 12) / 2;
                const photoH = photoW * 0.75;
                for (let pIdx = 0; pIdx < d.photos.length; pIdx++) {
                    const col = pIdx % 2;
                    if (col === 0 && y + photoH > page.h - margin - 30) {
                        drawFooter(pageNum);
                        doc.addPage(); pageNum++;
                        y = margin;
                    }
                    const px = margin + col * (photoW + 12);
                    try {
                        doc.addImage(d.photos[pIdx].data, 'JPEG', px, y, photoW, photoH, undefined, 'FAST');
                    } catch (err) {
                        doc.setFontSize(9);
                        doc.setTextColor(150);
                        doc.text('(Photo could not be embedded)', px, y + photoH / 2);
                        doc.setTextColor(30);
                    }
                    if (col === 1 || pIdx === d.photos.length - 1) {
                        y += photoH + 12;
                    }
                }
            }

            drawFooter(pageNum);
        }

        const filename = `sitewalk-${sanitise(p.name || 'report')}-${(p.date || '').replace(/-/g, '') || Date.now()}.pdf`;
        doc.save(filename);
    }

    function severityColor(sev) {
        switch (sev) {
            case 'Low': return [107, 114, 128];
            case 'High': return [228, 107, 38];
            case 'Critical': return [208, 52, 44];
            default: return [245, 166, 35];
        }
    }

    function sanitise(s) {
        return String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 40) || 'report';
    }

    function renderAll() {
        renderProject();
        renderDefectList();
    }

    renderAll();
})();
