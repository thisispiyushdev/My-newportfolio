"use client";

import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { Send } from 'lucide-react';
import { Dialog } from './ui/Dialog';
import { Input } from './ui/Input';
import { Textarea } from './ui/Textarea';
import { Button } from './ui/Button';

interface ContactFormProps {
  onClose: () => void;
}

export default function ContactForm({ onClose }: ContactFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    // emailjs credentials from original code
    const SERVICE_ID = 'service_b4uz10g';
    const TEMPLATE_ID = 'template_5zjd5gj';
    const PUBLIC_KEY = 'eGbI_zQTn0RZsYs3E';

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
      .then(() => {
        setIsSubmitting(false);
        setSubmitStatus('success');
        // Automatically close after success
        setTimeout(() => {
          onClose();
        }, 2000);
      }, (error) => {
        console.error(error);
        setIsSubmitting(false);
        setSubmitStatus('error');
      });
  };

  return (
    <Dialog isOpen={true} onClose={onClose} className="max-w-lg border border-cyberlime/20 bg-slate-950 dark:bg-obsidian">
      <div className="mb-6">
        <h3 className="text-2xl font-bold font-mono tracking-widest text-slate-800 dark:text-white uppercase flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-cyberlime animate-pulse"></span>
          Direct Link
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 font-light">
          Establish a secure connection and transmit your message directly to the developer.
        </p>
      </div>

      <form ref={formRef} onSubmit={sendEmail} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-mono text-cyberlime uppercase tracking-widest">Name Identification</label>
          <Input 
            type="text" 
            name="user_name" 
            required
            placeholder="e.g. John Doe"
            className="w-full bg-white/[0.01] border-slate-200 dark:border-white/5 focus:border-cyberlime/50 text-slate-900 dark:text-white"
          />
        </div>
        
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-mono text-cyberlime uppercase tracking-widest">Return Address (Email)</label>
          <Input 
            type="email" 
            name="user_email" 
            required
            placeholder="e.g. john@company.com"
            className="w-full bg-white/[0.01] border-slate-200 dark:border-white/5 focus:border-cyberlime/50 text-slate-900 dark:text-white"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-mono text-cyberlime uppercase tracking-widest">Subject Payload</label>
          <Input 
            type="text" 
            name="subject" 
            required
            placeholder="Inquiry Topic"
            className="w-full bg-white/[0.01] border-slate-200 dark:border-white/5 focus:border-cyberlime/50 text-slate-900 dark:text-white"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-mono text-cyberlime uppercase tracking-widest">Data Payload (Message)</label>
          <Textarea 
            name="message" 
            required
            rows={4}
            placeholder="Detail your request or inquiry here..."
            className="w-full bg-white/[0.01] border-slate-200 dark:border-white/5 focus:border-cyberlime/50 text-slate-900 dark:text-white"
          />
        </div>

        <Button 
          type="submit" 
          disabled={isSubmitting}
          className={`mt-4 w-full flex items-center justify-center gap-2 py-4 rounded-xl font-mono tracking-widest font-bold uppercase transition-all shadow-[0_0_20px_rgba(203,255,0,0.1)] ${
            isSubmitting 
              ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
              : 'bg-cyberlime text-obsidian hover:bg-slate-800 hover:text-white dark:hover:bg-white dark:hover:text-obsidian'
          }`}
        >
          {isSubmitting ? 'TRANSMITTING...' : submitStatus === 'success' ? 'TRANSMISSION SENT' : 'TRANSMIT DATA'}
          {!isSubmitting && submitStatus !== 'success' && <Send size={18} />}
        </Button>

        {submitStatus === 'error' && (
          <p className="text-red-500 text-sm font-mono mt-2 text-center">
            Transmission failed. Please check your connection and configuration parameters.
          </p>
        )}
      </form>

      <div className="mt-8 pt-4 border-t border-slate-200 dark:border-white/5 text-center">
        <p className="text-[10px] text-slate-500 font-mono tracking-widest uppercase flex items-center justify-center gap-2">
          Powered by EmailJS <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
        </p>
      </div>
    </Dialog>
  );
}
