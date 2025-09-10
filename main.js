document.addEventListener('DOMContentLoaded', () => {

    // =================================================================
    // Bagian Navigasi & Tampilan Halaman (Page Views)
    // =================================================================
    const pages = document.querySelectorAll('.auth-page, .dashboard');
    const loginLink = document.getElementById('show-login');
    const registerLink = document.getElementById('show-register');
    const loginForm = document.getElementById('login-form');
    const userLogout = document.getElementById('user-logout');
    const operatorLogout = document.getElementById('operator-logout');

    function showPage(pageId) {
        pages.forEach(page => {
            page.classList.remove('active');
            if (page.id === pageId) {
                page.classList.add('active');
            }
        });
    }

    loginLink.addEventListener('click', (e) => {
        e.preventDefault();
        showPage('login-page');
    });

    registerLink.addEventListener('click', (e) => {
        e.preventDefault();
        showPage('register-page');
    });
    
    // Logika Login
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const role = document.getElementById('login-role').value;
        if (role === 'operator') {
            showPage('operator-dashboard');
            initOperatorDashboard();
        } else {
            showPage('user-dashboard');
            initUserDashboard(role);
        }
    });

    // Logika Logout
    const handleLogout = (e) => {
        e.preventDefault();
        showPage('login-page');
    };
    userLogout.addEventListener('click', handleLogout);
    operatorLogout.addEventListener('click', handleLogout);


    // =================================================================
    // Inisialisasi Dashboard User (Mahasiswa/Dosen)
    // =================================================================
    function initUserDashboard(role) {
        const pageTitle = document.getElementById('user-page-title');
        const userNameDisplay = document.getElementById('user-name-display');
        const navLinks = document.querySelectorAll('#user-dashboard .sidebar-nav .nav-link:not(.logout)');
        const contentPages = document.querySelectorAll('#user-dashboard .page-content');
        
        // Setup profil user
        userNameDisplay.textContent = role === 'mahasiswa' ? 'Budi (Mahasiswa)' : 'Dr. Ani (Dosen)';
        
        // Generate form peminjaman sesuai role
        generatePeminjamanForm(role);

        // Navigasi konten di dalam dashboard
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('data-target');
                
                navLinks.forEach(nav => nav.classList.remove('active'));
                link.classList.add('active');
                
                contentPages.forEach(page => {
                    page.classList.remove('active');
                    if(page.id === targetId) {
                        page.classList.add('active');
                        pageTitle.textContent = link.textContent;
                    }
                });
            });
        });
        
        // Muat data awal
        loadUserMockData();
    }

    function generatePeminjamanForm(role) {
        const formContainer = document.getElementById('peminjaman-form');
        let formHTML = `
            <div class="input-group">
                <label>Nama Lengkap</label>
                <input type="text" value="${role === 'mahasiswa' ? 'Budi' : 'Dr. Ani'}" disabled>
            </div>
             <div class="input-group">
                <label>NIM / NIP</label>
                <input type="text" value="${role === 'mahasiswa' ? '12345678' : '87654321'}" disabled>
            </div>
        `;
        
        if (role === 'mahasiswa') {
            formHTML += `
                 <div class="input-group">
                    <label>Kelas</label>
                    <input type="text" value="IF-45-01" required>
                </div>
                 <div class="input-group">
                    <label>Angkatan</label>
                    <input type="text" value="2021" required>
                </div>
            `;
        }

        formHTML += `
            <div class="input-group">
                <label for="jenis-lab">Jenis Lab</label>
                <select id="jenis-lab" required>
                    <option>Lab Pemrograman Dasar 1</option>
                    <option>Lab Mandiri</option>
                    <option>Lab Server</option>
                </select>
            </div>
            <div class="input-group">
                <label for="waktu-peminjaman">Waktu Peminjaman</label>
                <input type="datetime-local" id="waktu-peminjaman" required>
            </div>
             <div class="input-group">
                <label for="tujuan">Tujuan Peminjaman</label>
                <select id="tujuan" required>
                    <option value="matkul">Mata Kuliah</option>
                    <option value="penelitian">Penelitian</option>
                    <option value="lainnya">Lainnya</option>
                </select>
            </div>
             <button type="submit" class="btn btn-primary">Ajukan Peminjaman</button>
        `;

        formContainer.innerHTML = formHTML;
    }

    function loadUserMockData() {
        // Data Status Peminjaman
        const statusContainer = document.getElementById('status-peminjaman-terkini');
        statusContainer.innerHTML = `
            <p><strong>Lab Pemrograman Dasar 1</strong> - Hari ini, 13:00-15:00</p>
            <p>Status: <span class="status approved">Disetujui</span></p>
        `;

        // Data Jadwal Lab
        const jadwalContainer = document.getElementById('jadwal-lab-container');
        jadwalContainer.innerHTML = `
            <div class="card">
                <h4>Lab Pemrograman Dasar 1</h4>
                <p><strong>08:00 - 10:00:</strong> Kelas IF-45-01 (Mata Kuliah: Algoritma)</p>
                <p><strong>13:00 - 15:00:</strong> Budi (Peminjaman Individu)</p>
            </div>
        `;
        
        // Data Informasi Lab
        const infoContainer = document.getElementById('info-lab-list');
        infoContainer.innerHTML = `
            <div class="card">
                <h3>Lab Pemrograman Dasar 1</h3>
                <p>Lokasi: Gedung A, Lantai 2</p>
                <p>Inventaris: 40 PC (Core i5, 16GB RAM)</p>
                <p>Aturan: Dilarang makan dan minum.</p>
                <button class="btn" onclick="showLabDetail()">Detail Lanjutan</button>
            </div>
        `;
    }

    // =================================================================
    // Inisialisasi Dashboard Operator
    // =================================================================
    function initOperatorDashboard() {
        const pageTitle = document.getElementById('operator-page-title');
        const navLinks = document.querySelectorAll('#operator-dashboard .sidebar-nav .nav-link:not(.logout)');
        const contentPages = document.querySelectorAll('#operator-dashboard .page-content');

        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('data-target');

                navLinks.forEach(nav => nav.classList.remove('active'));
                link.classList.add('active');

                contentPages.forEach(page => {
                    page.classList.remove('active');
                    if (page.id === targetId) {
                        page.classList.add('active');
                        pageTitle.textContent = link.textContent;
                    }
                });
            });
        });

        loadOperatorMockData();
        renderUsageChart();
    }

    function loadOperatorMockData() {
        // Data Peminjaman
        const peminjamanTable = document.getElementById('peminjaman-table').querySelector('tbody');
        peminjamanTable.innerHTML = `
            <tr>
                <td>BK001</td>
                <td>Budi (12345678)</td>
                <td>Lab Mandiri</td>
                <td>12 Sep 2025, 10:00</td>
                <td><span class="status pending">Pending</span></td>
                <td><button class="btn">Detail</button></td>
            </tr>
             <tr>
                <td>BK002</td>
                <td>Dr. Ani (87654321)</td>
                <td>Lab Server</td>
                <td>11 Sep 2025, 14:00</td>
                <td><span class="status approved">Disetujui</span></td>
                <td><button class="btn">Detail</button></td>
            </tr>
        `;

        // Data Pengguna
        const penggunaTable = document.getElementById('pengguna-table').querySelector('tbody');
        penggunaTable.innerHTML = `
            <tr>
                <td>Budi</td>
                <td>12345678</td>
                <td>Mahasiswa</td>
                <td>Aktif</td>
                <td><button class="btn">Edit</button></td>
            </tr>
        `;
        
        // Data Monitoring
        const monitoringContainer = document.getElementById('monitoring-lab-view');
        let desksHTML = '';
        for(let i=1; i <= 20; i++) {
            const isRusak = i % 7 === 0; // Simulasi ada yang rusak
            desksHTML += `<div class="desk-item ${isRusak ? 'desk-rusak' : 'desk-ok'}">Meja ${i}</div>`;
        }
        monitoringContainer.innerHTML = desksHTML;
    }
    
    function renderUsageChart() {
        const ctx = document.getElementById('usageChart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'],
                datasets: [{
                    label: 'Jumlah Jam Penggunaan',
                    data: [8, 12, 5, 10, 15],
                    backgroundColor: 'rgba(0, 123, 255, 0.5)',
                    borderColor: 'rgba(0, 123, 255, 1)',
                    borderWidth: 1
                }]
            },
            options: { scales: { y: { beginAtZero: true } } }
        });
    }


    // =================================================================
    // Logika Modal
    // =================================================================
    const modal = document.getElementById('lab-detail-modal');
    const closeModalBtn = document.querySelector('.close-button');

    window.showLabDetail = function() {
        const modalBody = document.getElementById('modal-lab-body');
        modalBody.innerHTML = `
            <h4>Denah Lab Pemrograman Dasar 1</h4>
            <div class="lab-monitoring-grid">
                ${Array.from({length: 20}, (_, i) => {
                    const isRusak = (i + 1) % 5 === 0;
                    return `<div class="desk-item ${isRusak ? 'desk-rusak' : 'desk-ok'}" onclick="alert('Detail Kerusakan: Meja ${i+1} - Monitor Mati')">Meja ${i+1}</div>`;
                }).join('')}
            </div>
        `;
        modal.classList.add('active');
    }

    closeModalBtn.addEventListener('click', () => modal.classList.remove('active'));
    window.addEventListener('click', (e) => {
        if(e.target == modal) {
            modal.classList.remove('active');
        }
    });

    // Inisialisasi halaman awal
    showPage('login-page');
});
