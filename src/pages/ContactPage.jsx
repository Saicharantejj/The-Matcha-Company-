import { useState } from 'react'
import PageShell from '../components/PageShell'
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
    <PageShell>
      <main className="min-h-screen pt-4 sm:pt-6 pb-12 sm:pb-16 px-4 sm:px-8 bg-[#0C122C]">
        <div className="mx-auto max-w-5xl space-y-8">
          {/* Page Header */}
          <div className="text-center space-y-3">
            <span className="inline-block px-3.5 py-1 rounded-full bg-[#FF5400]/10 dark:bg-[#FF5400]/20 text-[#FF5400] font-mono text-xs font-bold uppercase tracking-widest">
              SAY HELLO
            </span>
            <h1 className="font-display text-4xl sm:text-5xl font-black uppercase text-[#17245B] dark:text-white tracking-normal">
              GET IN TOUCH WITH CHASKA
            </h1>
            <p className="font-sans text-sm text-stone-600 dark:text-stone-300 max-w-lg mx-auto font-normal">
              Have questions about your order, bulk corporate gifting, or just want to chat snacks? Drop us a note!
            </p>
          </div>

          {/* Contact Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Info Card */}
            <div className="lg:col-span-5 p-8 sm:p-10 rounded-3xl bg-[#17245B] dark:bg-[#131D4A] text-white space-y-8 shadow-md flex flex-col justify-between border border-white/10 dark:border-[#243373]">
              <div className="space-y-6">
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#FF5400]">
                  DIRECT CHANNELS
                </span>
                
                <div className="space-y-5">
                  <div>
                    <h3 className="font-display text-base font-bold uppercase text-white">EMAIL US</h3>
                    <p className="font-sans text-xs text-stone-300 mt-0.5">For orders, feedback &amp; inquiries:</p>
                    <a href="mailto:snackchaska@gmail.com" className="font-mono text-xs font-bold text-[#FF5400] hover:underline block mt-1">
                      snackchaska@gmail.com
                    </a>
                  </div>

                  <div>
                    <h3 className="font-display text-base font-bold uppercase text-white">CORPORATE &amp; BULK</h3>
                    <p className="font-sans text-xs text-stone-300 mt-0.5">Custom stash boxes &amp; event hampers:</p>
                    <a href="mailto:snackchaska@gmail.com" className="font-mono text-xs font-bold text-[#FF5400] hover:underline block mt-1">
                      snackchaska@gmail.com
                    </a>
                  </div>

                  <div>
                    <h3 className="font-display text-base font-bold uppercase text-white">OPERATING HOURS</h3>
                    <p className="font-sans text-xs text-stone-300 mt-0.5 font-normal">Mon – Sat: 10:00 AM – 7:00 PM IST</p>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 dark:border-[#243373] font-mono text-xs text-stone-300">
                <p>📍 Roasted &amp; Dispatched across India</p>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-7 p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#131D4A] border border-stone-200/80 dark:border-[#243373] shadow-xs">
              {submitted ? (
                <div className="py-12 text-center space-y-3">
                  <span className="text-4xl block">🎉</span>
                  <h3 className="font-display text-2xl font-bold uppercase text-[#17245B] dark:text-white">
                    Message Received!
                  </h3>
                  <p className="font-sans text-sm text-stone-600 dark:text-stone-300 max-w-sm mx-auto font-normal">
                    Thanks for reaching out. We will get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="font-mono text-[10px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rahul Sharma"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] dark:bg-[#1C2A6B] border border-stone-200/80 dark:border-[#243373] font-sans text-xs text-[#17245B] dark:text-white focus:outline-none focus:border-[#FF5400]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-mono text-[10px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. rahul@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] dark:bg-[#1C2A6B] border border-stone-200/80 dark:border-[#243373] font-sans text-xs text-[#17245B] dark:text-white focus:outline-none focus:border-[#FF5400]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-mono text-[10px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                      Subject
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] dark:bg-[#1C2A6B] border border-stone-200/80 dark:border-[#243373] font-mono text-xs font-bold text-[#17245B] dark:text-white focus:outline-none focus:border-[#FF5400]"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Order Status">Order Status &amp; Tracking</option>
                      <option value="Corporate Gifting">Corporate Gifting &amp; Bulk Orders</option>
                      <option value="Feedback">Flavour Feedback</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-mono text-[10px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="How can we help?"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] dark:bg-[#1C2A6B] border border-stone-200/80 dark:border-[#243373] font-sans text-xs text-[#17245B] dark:text-white focus:outline-none focus:border-[#FF5400]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn w-full py-4 text-xs font-bold tracking-wider shadow-sm"
                  >
                    SEND MESSAGE ➔
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
    </PageShell>
  )
}
