// ── Mobile drawer ──────────────────────────────────
const burgerBtn = document.getElementById('burgerBtn')
const drawer    = document.getElementById('drawer')

burgerBtn.addEventListener('click', () => {
    const isOpen = drawer.classList.toggle('hidden')
    drawer.classList.toggle('flex', !isOpen)
    burgerBtn.setAttribute('aria-expanded', String(!isOpen))
})

document.querySelectorAll('.drawer-link').forEach(el =>
    el.addEventListener('click', () => {
        drawer.classList.add('hidden')
        drawer.classList.remove('flex')
        burgerBtn.setAttribute('aria-expanded', 'false')
    })
)

// ── Header scroll shadow ────────────────────────────
const header = document.getElementById('header')
window.addEventListener('scroll', () => {
    header.style.boxShadow = window.scrollY > 40
        ? '0 2px 24px rgba(0,0,0,0.25)'
        : ''
    highlightNav()
}, { passive: true })

// ── Active nav link ─────────────────────────────────
function highlightNav() {
    const sections = document.querySelectorAll('section[id]')
    let current = ''
    sections.forEach(s => {
        if (window.scrollY >= s.offsetTop - 100) current = s.id
    })
    document.querySelectorAll('.nav-link').forEach(link => {
        const isActive = link.getAttribute('href') === `#${current}`
        link.style.color = isActive ? '#ffffff' : ''
        link.style.fontWeight = isActive ? '700' : ''
    })
}

// ── Scroll reveal ───────────────────────────────────
const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('visible')
            observer.unobserve(e.target)
        }
    })
}, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' })

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    initMap()
})

// ── FAQ accordion ───────────────────────────────────
document.querySelectorAll('.faq-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const item = btn.closest('.faq-item')
        const isOpen = item.classList.contains('open')

        // close all
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'))
        document.querySelectorAll('.faq-btn').forEach(b => {
            b.closest('.faq-item').querySelector('.faq-answer').style.paddingTop = '0'
        })

        if (!isOpen) {
            item.classList.add('open')
        }
    })
})

// ── Leaflet map ─────────────────────────────────────
function initMap() {
    const mapEl = document.getElementById('map')
    if (!mapEl || typeof L === 'undefined') return

    const lat = -23.5613, lng = -46.6565
    const map = L.map('map', { scrollWheelZoom: false }).setView([lat, lng], 16)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map)

    const icon = L.divIcon({
        className: '',
        html: `<div style="width:36px;height:36px;background:#18181b;border-radius:50% 50% 50% 0;transform:rotate(-45deg);border:3px solid #fff;box-shadow:0 3px 10px rgba(0,0,0,.25)"></div>`,
        iconSize: [36, 36], iconAnchor: [18, 36], popupAnchor: [0, -40]
    })

    L.marker([lat, lng], { icon }).addTo(map)
        .bindPopup(`<div style="font-family:Inter,sans-serif;padding:4px 2px;min-width:160px">
            <strong style="font-size:.875rem;color:#0a2222">Dr. Ricardo Silva</strong><br>
            <span style="font-size:.78rem;color:#64748b">Av. Paulista, 1000 — São Paulo/SP</span>
        </div>`, { maxWidth: 220 })
        .openPopup()
}
