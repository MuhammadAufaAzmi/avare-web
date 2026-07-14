import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Droplets, Sparkles, Leaf, Send, ChevronRight, X, ChevronLeft } from 'lucide-react';

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const articles = [
  {
    id: 1,
    category: 'Health & Science',
    title: 'Mengapa Daun Jambu Biji Efektif untuk Pertolongan Pertama pada Luka? Ini Penjelasan Medisnya!',
    date: '14 Juli 2026',
    content: `Selama turun-temurun, daun jambu biji sering digunakan masyarakat sebagai obat herbal alternatif. Namun, tahukah Anda apa yang terjadi secara medis ketika ekstrak daun jambu biji diaplikasikan pada luka terbuka seperti luka bakar ringan atau lecet?

Secara ilmiah, daun jambu biji kaya akan senyawa aktif seperti tannin, flavonoid, dan polifenol. Senyawa-senyawa ini bekerja sebagai agen antibakteri alami yang sangat kuat. Ketika kulit kita mengalami luka terbuka, risiko terbesar yang dihadapi adalah kolonisasi bakteri (seperti Staphylococcus aureus) yang bisa memicu infeksi, pembengkakan, hingga memperlama proses penyembuhan. Ekstrak daun jambu biji langsung bekerja membentuk pertahanan luar untuk menghambat pertumbuhan bakteri tersebut.

Hebatnya lagi, tidak seperti antiseptik kimia konvensional yang terkadang bersifat sitotoksik (merusak sel kulit sehat yang sedang berusaha tumbuh), daun jambu biji justru mendukung fase proliferasi sel secara alami. Mengingat mobilitas harian kita yang tinggi, memiliki sediaan ekstrak daun jambu biji dalam bentuk gel topikal yang praktis adalah langkah awal P3K terbaik untuk melindungi kulit Anda kapan saja dan di mana saja.`,
    image: '/guava.png',
    excerpt: 'Secara ilmiah, daun jambu biji kaya senyawa aktif seperti tannin dan flavonoid. Ekstraknya membentuk pertahanan antibakteri kuat tanpa merusak sel sehat...'
  },
  {
    id: 2,
    category: 'First Aid Tips',
    title: 'Jangan Dioles Kecap atau Odol! Ini Cara Tepat Menangani Luka Bakar Ringan di Rumah',
    date: '10 Juli 2026',
    content: `Pernahkah Anda refleks mengoleskan kecap, odol, atau mentega saat tidak sengaja terkena cipratan minyak panas atau knalpot? Jika iya, sebaiknya hentikan kebiasaan keliru ini sekarang juga.

Mengoleskan bahan dapur pada luka bakar justru dapat memerangkap panas di dalam kulit dan memicu infeksi bakteri karena bahan-bahan tersebut tidak steril. Lalu, bagaimana langkah pertolongan pertama (P3K) yang benar secara medis?

1. Alirkan Air Bersih: Segera basuh area yang terkena luka bakar dengan air mengalir (bukan air es) selama 10–15 menit untuk menurunkan suhu jaringan kulit.
2. Bersihkan dengan Lembut: Pastikan area luka bersih dari kotoran yang menempel.
3. Berikan Sensasi Dingin yang Aman (Cooling Effect): Gunakan gel topikal berbasis air (water-based) yang ringan, cepat meresap, dan bebas dari bahan kimia keras. Gel jenis ini akan memberikan sensasi dingin instan untuk menenangkan perih menyengat tanpa menyumbat pori-pori kulit.
4. Kunci Kelembapan Kulit: Pilih produk yang mengandung Panthenol atau Hyaluronic Acid untuk merangsang sel fibroblas agar jaringan skin barrier yang rusak bisa segera beregenerasi dengan cepat dan alami.

Selalu sediakan everyday rescue gel yang andal di dalam tas atau kotak obat rumah Anda agar penanganan luka bisa dilakukan secara cepat, tepat, dan higienis!`,
    image: '/water.png',
    excerpt: 'Mengoleskan bahan dapur seperti odol atau kecap justru memerangkap panas. Gunakan air mengalir dan oleskan gel berbasis air untuk cooling effect aman...'
  },
  {
    id: 3,
    category: 'Skincare & Healing',
    title: 'Mengenal Triple-Action Formula: Kunci Pemulihan Skin Barrier yang Rusak akibat Luka',
    date: '5 Juli 2026',
    content: `Penyembuhan luka ringan bukan sekadar membuat luka tersebut kering, melainkan bagaimana memastikan seluruh fase regenerasi jaringan kulit berjalan secara maksimal tanpa meninggalkan bekas yang mengganggu. Di sinilah pentingnya peran Triple-Action Formula.

Formula sinergis ini menggabungkan tiga kekuatan utama untuk merawat kulit yang cedera:

- Perlindungan Antibakteri: Menangkal radikal bebas dan bakteri luar agar luka tetap steril.
- Hidrasi Intensif: Menggunakan molekul penahan air seperti Hyaluronic Acid untuk mengunci kelembapan ekstrem pada area kulit yang rusak. Kulit yang lembap terbukti secara klinis sembuh jauh lebih cepat dibanding kulit yang dibiarkan kering dan kaku.
- Stimulasi Sel Baru: Kehadiran Panthenol (Provitamin B5) bertugas merangsang sel fibroblas untuk memproduksi kolagen baru, sehingga jaringan skin barrier yang sempat rusak akibat lecet atau luka bakar bisa menyatu kembali dengan sempurna.

Dengan tekstur gel yang tidak lengket dan nyaman digunakan sepanjang hari, kombinasi bahan aktif alami dan klinis ini memastikan kulit Anda mendapatkan perawatan terbaik untuk kembali sehat dan mulus.`,
    image: '/skin.png',
    excerpt: 'Penyembuhan luka bukan sekadar membuat kering. Hidrasi intensif dan stimulasi sel baru sangat penting untuk mencegah bekas luka permanen...'
  }
];

const checkoutProducts = [
  { name: 'AVARE Skin Rescue Gel (Produk Biasa)', price: 22000 },
  { name: 'Bundling 50 Pcs', price: 935000 },
  { name: 'Eco Companion Kit (Pot, Media Tanam & Seed Paper)', price: 17000 }
];

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  
  const [selectedProductIdx, setSelectedProductIdx] = useState(0);
  const [orderQuantity, setOrderQuantity] = useState(1);

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    setIsCheckoutOpen(false);
    setIsSuccessOpen(true);
    setTimeout(() => setIsSuccessOpen(false), 3000); // auto close after 3 seconds
  };
  
  const carouselRef = useRef();
  const [carouselWidth, setCarouselWidth] = useState(0);
  const scrollContainerRef = useRef(null);

  const slideLeft = () => {
    if(scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -360, behavior: 'smooth' });
    }
  };

  const slideRight = () => {
    if(scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 360, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (carouselRef.current) {
      setCarouselWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
    }
    const handleResize = () => {
      if (carouselRef.current) {
        setCarouselWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Navbar */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} style={{ boxShadow: scrolled ? '0 5px 20px rgba(0,0,0,0.05)' : 'none' }}>
        <div className="container">
          <a href="#" className="logo-link">
            <img src="/navbar-logo.png" alt="AVARE" className="navbar-logo-img" />
          </a>
          <div className="nav-links">
            <a href="#about">Tentang Produk</a>
            <a href="#education">Edukasi</a>
            <a href="#eco-guide">Eco-Guide</a>
            <a href="#feedback">Hubungi Kami</a>
          </div>
          <button className="btn btn-primary" onClick={() => setIsCheckoutOpen(true)}>Beli Sekarang</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="container">
          <motion.div 
            className="hero-content"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={fadeIn} className="hero-badge">One Gel, Every Rescue.</motion.div>
            <motion.h1 variants={fadeIn}>Perlindungan Alami, Pemulihan Maksimal</motion.h1>
            <motion.p variants={fadeIn}>
              AVARE Skin Rescue Gel menawarkan sensasi cooling effect instan untuk meredakan luka ringan, diformulasikan dari Ekstrak Daun Jambu Biji murni. Solusi cerdas pengganti mitos perawatan kuno.
            </motion.p>
            <motion.div variants={fadeIn}>
              <a href="#about" className="btn btn-accent">Pelajari Lebih Lanjut <ChevronRight size={18} /></a>
            </motion.div>
          </motion.div>
          <motion.div 
            className="hero-image-container"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <img src="/product.jpg" alt="AVARE Skin Rescue Gel" className="hero-image" />
          </motion.div>
        </div>
      </section>

      {/* Slogan Marquee Section */}
      <div className="slogan-marquee">
        <div className="marquee-track">
          {[...Array(15)].map((_, i) => (
            <React.Fragment key={i}>
              <span>ONE GEL, EVERY RESCUE</span>
              <span className="dot">✦</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* About Section */}
      <section className="about" id="about">
        <div className="container">
          <motion.div 
            className="section-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <h2>Triple-Action Formula</h2>
            <p>Sinergi tiga bahan aktif utama untuk pemulihan kulit akibat luka ringan dengan aman, cepat, dan higienis.</p>
          </motion.div>

          <motion.div 
            className="triple-action"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            <motion.div className="action-card" variants={fadeIn}>
              <div className="action-icon"><ShieldCheck size={32} /></div>
              <h3>Perlindungan Antibakteri</h3>
              <p>Ekstrak Daun Jambu Biji menangkal bakteri luar agar luka tetap steril tanpa efek sitotoksik kimiawi keras.</p>
            </motion.div>
            <motion.div className="action-card" variants={fadeIn}>
              <div className="action-icon"><Droplets size={32} /></div>
              <h3>Hidrasi Intensif</h3>
              <p>Kandungan Hyaluronic Acid mengunci kelembapan ekstrem pada kulit, mempercepat proses penyembuhan jaringan kulit.</p>
            </motion.div>
            <motion.div className="action-card" variants={fadeIn}>
              <div className="action-icon"><Sparkles size={32} /></div>
              <h3>Stimulasi Sel Baru</h3>
              <p>Panthenol (Provitamin B5) merangsang produksi kolagen dan meregenerasi skin barrier yang rusak agar menyatu sempurna.</p>
            </motion.div>
          </motion.div>

          <div className="ingredients-innovative">
            <motion.div 
              className="ingredients-header"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3>Ingredients Facts</h3>
              <p>Formulasi presisi untuk penyembuhan optimal.</p>
            </motion.div>
            
            <div className="ingredients-grid-innovative">
              {[
                { name: 'Ekstrak Daun Jambu Biji', desc: 'Agen antibakteri alami kaya flavonoid & tanin.', icon: <Leaf size={28} /> },
                { name: 'Panthenol', desc: 'Provitamin B5 untuk perbaikan skin barrier.', icon: <ShieldCheck size={28} /> },
                { name: 'Hyaluronic Acid', desc: 'Molekul pengunci kelembapan intensif.', icon: <Droplets size={28} /> },
                { name: 'Carbomer', desc: 'Memberikan sensasi cooling effect instan.', icon: <Sparkles size={28} /> }
              ].map((ing, i) => (
                <motion.div 
                  key={i}
                  className="ingredient-card-glow"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, type: 'spring', stiffness: 100 }}
                  whileHover={{ scale: 1.05, y: -10 }}
                >
                  <div className="ing-icon-wrapper">
                    {ing.icon}
                  </div>
                  <h4 className="ing-name">{ing.name}</h4>
                  <p className="ing-desc">{ing.desc}</p>
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              className="ing-footer"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
            >
              <div className="ing-badge">100% Bebas Alkohol</div>
              <div className="ing-badge">Bebas Pewangi Buatan</div>
              <div className="ing-badge">Cruelty-Free</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="education" id="education">
        <div className="container">
          <motion.div 
            className="section-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2>Edukasi Kesehatan</h2>
            <p>Pelajari lebih jauh tentang penanganan luka yang tepat dan tinggalkan mitos kuno yang berbahaya.</p>
          </motion.div>

          <motion.div 
            className="article-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {articles.map(article => (
              <motion.article 
                className="article-card" 
                variants={fadeIn} 
                key={article.id}
                onClick={() => setSelectedArticle(article)}
                style={{ cursor: 'pointer' }}
              >
                <div className="article-image" style={article.iconBg ? {backgroundColor: article.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center'} : {}}>
                  {article.image ? <img src={article.image} alt={article.title} /> : article.icon}
                </div>
                <div className="article-content">
                  <div className="article-category">{article.category}</div>
                  <h3 className="article-title">{article.title}</h3>
                  <div className="article-meta">Diterbitkan: {article.date}</div>
                  <p className="article-text">{article.excerpt}</p>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Article Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <motion.div 
            className="modal-overlay" 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedArticle(null)}
          >
            <motion.div 
              className="modal-content"
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="modal-close" onClick={() => setSelectedArticle(null)}><X size={24} /></button>
              <div className="modal-category">{selectedArticle.category}</div>
              <h2 className="modal-title">{selectedArticle.title}</h2>
              <div className="modal-meta">Diterbitkan: {selectedArticle.date}</div>
              <div className="modal-body">
                {selectedArticle.content.split('\n\n').map((para, idx) => {
                  if (para.startsWith('- ') || para.match(/^\d\./)) {
                    const items = para.split('\n');
                    return (
                      <ul key={idx} style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem', color: '#555' }}>
                        {items.map((item, i) => <li key={i} style={{ marginBottom: '0.5rem', fontSize: '1.05rem', lineHeight: '1.8' }}>{item.replace(/^- |^\d\. /, '')}</li>)}
                      </ul>
                    );
                  }
                  return <p key={idx}>{para}</p>;
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Eco-Guide Section */}
      <section className="eco" id="eco-guide">
        <div className="eco-header-wrapper">
          <motion.div 
            className="section-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem', textAlign: 'left' }}>
              <div style={{ flex: 1, minWidth: '300px' }}>
                <h2 style={{ fontSize: '2.5rem', fontFamily: 'Playfair Display', color: 'var(--color-primary-green)', marginBottom: '1rem' }}>Plant Your Care</h2>
                <p style={{ color: '#666', maxWidth: '600px', margin: '0' }}>
                  Kemasan kami menggunakan Seed Paper 100% biodegradable. Gunakan tombol panah di samping untuk melihat langkah menanamnya!
                </p>
              </div>
              <div className="slider-controls">
                <button onClick={slideLeft} className="slider-btn"><ChevronLeft size={24} /></button>
                <button onClick={slideRight} className="slider-btn"><ChevronRight size={24} /></button>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="carousel-container" ref={scrollContainerRef}>
          <div className="carousel-item image-item">
            <img src="/seed.png" alt="Seed Paper" />
          </div>
          {[
            { title: 'Sobek & Rendam', desc: 'Sobek seed paper jadi kecil dan rendam di air 24 jam hingga lunak.' },
            { title: 'Siapkan Media', desc: 'Isi pot dengan tanah lembap yang subur dan siap tanam.' },
            { title: 'Tanam & Tutup', desc: 'Letakkan kertas merata, lalu tutup kembali dengan tanah tipis (0.5cm).' },
            { title: 'Rawat & Tumbuh', desc: 'Semprot air lembut setiap hari. Tunas baru akan muncul dalam 7-14 hari!' }
          ].map((step, index) => (
            <div className="carousel-item step-item-card" key={index}>
              <div className="step-bg-number">0{index + 1}</div>
              <div className="step-content-card">
                <h4>{step.title}</h4>
                <p>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Feedback Section */}
      <section className="feedback" id="feedback">
        <div className="container">
          <motion.div 
            className="section-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2>Beri Tahu Kami Pendapat Anda</h2>
            <p style={{ margin: '0 auto' }}>Kami terus berinovasi untuk memberikan solusi P3K terbaik untuk Anda dan keluarga.</p>
          </motion.div>

          <motion.form 
            className="feedback-form"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="form-group">
              <label>Nama Lengkap</label>
              <input type="text" className="form-control" placeholder="Masukkan nama Anda" />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" className="form-control" placeholder="email@contoh.com" />
            </div>
            <div className="form-group">
              <label>Ulasan & Masukan</label>
              <textarea className="form-control" placeholder="Bagaimana pengalaman Anda menggunakan AVARE?"></textarea>
            </div>
            <button type="submit" className="btn btn-accent" style={{ width: '100%', marginTop: '1rem' }}>
              <Send size={18} /> Kirim Masukan
            </button>
          </motion.form>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="container">
          <div className="footer-logo">AVARE</div>
          <p>© 2026 AVARE Skin Rescue Gel. Hak Cipta Dilindungi.</p>
        </div>
      </footer>

      {/* Checkout Modal */}
      <AnimatePresence>
        {isCheckoutOpen && (
          <div className="modal-overlay" onClick={() => setIsCheckoutOpen(false)}>
            <motion.div 
              className="checkout-modal"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="modal-close" onClick={() => setIsCheckoutOpen(false)}>
                <X size={24} />
              </button>
              
              <div className="checkout-header">
                <h3>Beli AVARE Sekarang</h3>
                <p>Isi data pengiriman Anda untuk memproses pesanan.</p>
              </div>

              <form className="checkout-form" onSubmit={handleCheckoutSubmit}>
                <div className="form-group">
                  <label>Nama Penerima</label>
                  <input type="text" className="form-control" required placeholder="Masukkan nama lengkap" />
                </div>
                <div className="form-group">
                  <label>No. WhatsApp</label>
                  <input type="tel" className="form-control" required placeholder="08xxxxxxxxxx" />
                </div>
                <div className="form-group">
                  <label>Alamat Pengiriman</label>
                  <textarea className="form-control" required placeholder="Masukkan alamat lengkap" rows="3"></textarea>
                </div>
                <div className="form-group">
                  <label>Pilihan Produk</label>
                  <select 
                    className="form-control" 
                    value={selectedProductIdx} 
                    onChange={(e) => setSelectedProductIdx(Number(e.target.value))}
                  >
                    {checkoutProducts.map((p, idx) => (
                      <option key={idx} value={idx}>{p.name} - Rp {p.price.toLocaleString('id-ID')}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Jumlah Pesanan</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    min="1" 
                    value={orderQuantity}
                    onChange={(e) => setOrderQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    required 
                  />
                </div>
                
                <div className="checkout-summary">
                  <div className="summary-row">
                    <span>Harga Satuan</span>
                    <span>Rp {checkoutProducts[selectedProductIdx].price.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="summary-row total">
                    <span>Total Pembayaran</span>
                    <span>Rp {(checkoutProducts[selectedProductIdx].price * orderQuantity).toLocaleString('id-ID')}</span>
                  </div>
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem', padding: '1rem' }}>
                  Proses Pesanan Sekarang
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Success Notification Modal */}
      <AnimatePresence>
        {isSuccessOpen && (
          <div className="modal-overlay" style={{ zIndex: 2000 }}>
            <motion.div 
              className="success-modal"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <div className="success-icon">
                <ShieldCheck size={48} />
              </div>
              <h3>Pembelian Berhasil!</h3>
              <p>Terima kasih! Pesanan dummy Anda telah berhasil diproses.</p>
              <button className="btn btn-accent" onClick={() => setIsSuccessOpen(false)}>Tutup</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
