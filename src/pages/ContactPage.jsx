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
    addToast('Message sent! We will get back to you within 24 hours. 🍿', 'success')
  }

  return (
    <main className="min-h-screen pt-24 pb-24 px-4 sm:px-8 bg-[#F5EEDD]">
      <div className="mx-auto max-w-5xl space-y-12">
        {/* Page Header */}
        <div className="text-center space-y-3">
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#17245B] text-[#E2AE35] font-mono text-xs font-black uppercase tracking-widest border border-[#E2AE35]/40 shadow-xs">
            SAY HELLO
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-black uppercase text-[#17245B] tracking-tight">
            GET IN TOUCH WITH CHASKA
          </h1>
          <p className="font-sans text-sm text-[#17245B]/80 max-w-lg mx-auto">
            Have questions about your order, bulk corporate gifting, or just want to chat snacks? Drop us a note!
          </p>
        </div>

        {/* Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Info Card */}
          <div className="lg:col-span-5 p-7 sm:p-8 rounded-3xl bg-[#17245B] text-[#F5EEDD] space-y-8 shadow-md flex flex-col justify-between border border-[#E2AE35]/20">
            <div className="space-y-6">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#E2AE35]">
                DIRECT CHANNELS
              </span>
              
              <div className="space-y-5">
                <div>
                  <h3 className="font-display text-lg font-bold uppercase text-[#F5EEDD]">EMAIL US</h3>
                  <p className="font-sans text-xs text-[#F5EEDD]/75 mt-0.5">For orders, feedback &amp; inquiries:</p>
                  <a href="mailto:hello@snackchaska.shop" className="font-mono text-xs font-bold text-[#E2AE35] hover:underline block mt-1">
                    hello@snackchaska.shop
                  </a>
                </div>

                <div>
                  <h3 className="font-display text-lg font-bold uppercase text-[#F5EEDD]">CORPORATE &amp; BULK</h3>
                  <p className="font-sans text-xs text-[#F5EEDD]/75 mt-0.5">Custom stash boxes &amp; event hampers:</p>
                  <a href="mailto:b2b@snackchaska.shop" className="font-mono text-xs font-bold text-[#E2AE35] hover:underline block mt-1">
                    b2b@snackchaska.shop
                  </a>
                </div>

                <div>
                  <h3 className="font-display text-lg font-bold uppercase text-[#F5EEDD]">OPERATING HOURS</h3>
                  <p className="font-sans text-xs text-[#F5EEDD]/75 mt-0.5">Mon – Sat: 10:00 AM – 7:00 PM IST</p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 font-mono text-xs text-[#F5EEDD]/70">
              <p>📍 Roasted &amp; Dispatched across India</p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7 p-7 sm:p-8 rounded-3xl bg-[#FAF6ED] border border-[#17245B]/15 shadow-xs">
            {submitted ? (
              <div className="py-12 text-center space-y-3">
                <span className="text-4xl block">🎉</span>
                <h3 className="font-display text-2xl font-bold uppercase text-[#17245B]">
                  Message Received!
                </h3>
                <p className="font-sans text-sm text-[#17245B]/80 max-w-sm mx-auto">
                  Thanks for reaching out. We will get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#17245B]/70">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#F5EEDD] border border-[#17245B]/15 font-sans text-xs text-[#17245B] focus:outline-none focus:border-[#17245B]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#17245B]/70">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. rahul@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#F5EEDD] border border-[#17245B]/15 font-sans text-xs text-[#17245B] focus:outline-none focus:border-[#17245B]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#17245B]/70">
                    Subject
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#F5EEDD] border border-[#17245B]/15 font-mono text-xs text-[#17245B] font-bold focus:outline-none focus:border-[#17245B]"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Order Status">Order Status &amp; Tracking</option>
                    <option value="Corporate Gifting">Corporate Gifting &amp; Bulk Orders</option>
                    <option value="Feedback">Flavour Feedback</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#17245B]/70">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="How can we help?"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#F5EEDD] border border-[#17245B]/15 font-sans text-xs text-[#17245B] focus:outline-none focus:border-[#17245B]"
                  />
                </div>

                <button
                  type="submit"
                  className="btn w-full py-3.5 text-xs font-bold tracking-wider"
                >
                  SEND MESSAGE ➔
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
