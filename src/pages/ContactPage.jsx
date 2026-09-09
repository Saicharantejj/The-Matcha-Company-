import { useState } from 'react'
import { useToast } from '../components/Toast'
import { trackContact } from '../lib/metaPixel'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const { addToast } = useToast()

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    trackContact()
    addToast('Message sent successfully! We will get back to you within 24 hours.', 'success')
  }

  return (
    <main className="min-h-screen pt-28 pb-24 px-6 sm:px-12 bg-[#F8EECB]">
      <div className="mx-auto max-w-5xl space-y-12">
        {/* Page Header */}
        <div className="text-center space-y-4">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#D23D2D] text-[#F8EECB] font-mono text-xs font-bold uppercase tracking-widest">
            SAY HELLO
          </span>
          <h1 className="font-display text-4xl sm:text-6xl font-black uppercase text-[#6E433D] tracking-tight">
            GET IN TOUCH WITH CHASKA
          </h1>
          <p className="font-mono text-sm text-[#6E433D]/80 max-w-xl mx-auto">
            Have questions about your order, bulk corporate gifting, or just want to talk about makhana? Drop us a line!
          </p>
        </div>

        {/* Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Info Card */}
          <div className="lg:col-span-5 p-8 rounded-3xl bg-[#6E433D] text-[#F8EECB] space-y-8 shadow-xl flex flex-col justify-between">
            <div className="space-y-6">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#F5C065]">
                DIRECT CHANNELS
              </span>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-display text-xl font-bold uppercase text-white">EMAIL US</h3>
                  <p className="font-mono text-xs text-[#F8EECB]/70 mt-1">For orders, feedback &amp; inquiries:</p>
                  <a href="mailto:hello@chaskasnacks.com" className="font-mono text-sm font-bold text-[#F5C065] hover:underline block mt-1">
                    hello@chaskasnacks.com
                  </a>
                </div>

                <div>
                  <h3 className="font-display text-xl font-bold uppercase text-white">CORPORATE &amp; BULK</h3>
                  <p className="font-mono text-xs text-[#F8EECB]/70 mt-1">Custom stash boxes &amp; event hampers:</p>
                  <a href="mailto:gifting@chaskasnacks.com" className="font-mono text-sm font-bold text-[#F5C065] hover:underline block mt-1">
                    gifting@chaskasnacks.com
                  </a>
                </div>

                <div>
                  <h3 className="font-display text-xl font-bold uppercase text-white">ROASTING FACILITY</h3>
                  <p className="font-mono text-xs text-[#F8EECB]/80 leading-relaxed mt-1">
                    CHASKA HQ<br />
                    Industrial Tech Park, Sector 62<br />
                    Noida, Uttar Pradesh — 201309
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#F8EECB]/20 flex gap-4">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="px-4 py-2 rounded-full bg-white/10 text-xs font-mono text-[#F8EECB] hover:bg-[#D23D2D] transition-colors">
                INSTAGRAM ↗
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="px-4 py-2 rounded-full bg-white/10 text-xs font-mono text-[#F8EECB] hover:bg-[#31603D] transition-colors">
                TWITTER / X ↗
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7 p-8 sm:p-10 rounded-3xl bg-white border border-[#6E433D]/15 shadow-xl">
            {submitted ? (
              <div className="text-center py-16 space-y-4">
                <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#E8F5E9] text-[#31603D] text-2xl font-bold">
                  ✓
                </span>
                <h3 className="font-display text-2xl font-bold uppercase text-[#6E433D]">
                  MESSAGE RECEIVED!
                </h3>
                <p className="font-mono text-xs text-[#6E433D]/70 max-w-sm mx-auto">
                  Thank you for reaching out to CHASKA. Our team will review your note and respond within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn bg-[#D23D2D] mt-4"
                >
                  SEND ANOTHER MESSAGE
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="font-display text-2xl font-bold uppercase text-[#6E433D]">
                  SEND A MESSAGE
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="font-mono text-xs font-bold uppercase text-[#6E433D]">YOUR NAME</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ananya Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-[#6E433D]/20 text-sm focus:outline-none focus:border-[#D23D2D]"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="font-mono text-xs font-bold uppercase text-[#6E433D]">EMAIL ADDRESS</label>
                    <input
                      type="email"
                      required
                      placeholder="ananya@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-[#6E433D]/20 text-sm focus:outline-none focus:border-[#D23D2D]"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="font-mono text-xs font-bold uppercase text-[#6E433D]">SUBJECT</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-[#6E433D]/20 text-sm focus:outline-none focus:border-[#D23D2D] bg-white"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Order Status">Order Status</option>
                    <option value="Bulk / Corporate Gifting">Bulk / Corporate Gifting</option>
                    <option value="Press & Influencers">Press &amp; Influencers</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="font-mono text-xs font-bold uppercase text-[#6E433D]">YOUR MESSAGE</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell us what's on your mind..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-[#6E433D]/20 text-sm focus:outline-none focus:border-[#D23D2D]"
                  />
                </div>

                <button type="submit" className="w-full btn bg-[#D23D2D] py-4 text-sm font-bold">
                  SUBMIT MESSAGE
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
