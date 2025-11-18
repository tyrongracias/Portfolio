import { useState } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import emailjs from '@emailjs/browser';

interface ModernContactProps {
  isDarkMode: boolean;
}

export default function ModernContact({ isDarkMode }: ModernContactProps) {
  // Generate random math problem for CAPTCHA
  const generateMathProblem = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    return { num1, num2, answer: num1 + num2 };
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    business: '',
    services: [] as string[],
    timeframe: '',
    additionalInfo: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [mathProblem, setMathProblem] = useState(generateMathProblem());
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaError, setCaptchaError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Verify CAPTCHA
    if (parseInt(captchaInput) !== mathProblem.answer) {
      setCaptchaError(true);
      return;
    }
    
    setCaptchaError(false);
    setIsSubmitting(true);
    
    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        business: formData.business,
        services: formData.services.join(', '),
        timeframe: formData.timeframe,
        message: formData.additionalInfo,
      };

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      
      setSubmitStatus('success');
      // Reset form and generate new CAPTCHA
      setFormData({
        name: '',
        email: '',
        business: '',
        services: [],
        timeframe: '',
        additionalInfo: ''
      });
      setCaptchaInput('');
      setMathProblem(generateMathProblem());
    } catch (error) {
      console.error('Email send error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleServiceChange = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  return (
    <Card className={`backdrop-blur-sm border ${ 
      isDarkMode 
        ? 'bg-white/10 border-white/20' 
        : 'bg-black/10 border-black/20'
    }`}>
      <CardContent className="p-8">
                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <div className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-lg flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-green-400" style={{ fontFamily: '"Satoshi", sans-serif' }}>Message sent successfully! I'll get back to you soon.</span>
                  </div>
                )}
                
                {submitStatus === 'error' && (
                  <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg flex items-center space-x-3">
                    <AlertCircle className="w-5 h-5 text-red-400" />
                    <span className="text-red-400" style={{ fontFamily: '"Satoshi", sans-serif' }}>Failed to send message. Please try again.</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* YOUR INFO Section */}
                  <div className="space-y-4">
                    <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-black'}`} style={{ fontFamily: '"Satoshi", sans-serif' }}>
                      YOUR INFO
                    </h3>
                    
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className={`text-sm font-medium ${isDarkMode ? 'text-white/80' : 'text-black/80'}`} style={{ fontFamily: '"Satoshi", sans-serif' }}>
                          NAME
                        </label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your full name"
                          className={`focus:border-blue-400 transition-colors min-h-[50px] ${
                            isDarkMode 
                              ? 'bg-white/10 border-white/20 text-white placeholder:text-white/50' 
                              : 'bg-black/10 border-black/20 text-black placeholder:text-black/50'
                          }`}
                          style={{ fontFamily: '"Satoshi", sans-serif' }}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="email" className={`text-sm font-medium ${isDarkMode ? 'text-white/80' : 'text-black/80'}`} style={{ fontFamily: '"Satoshi", sans-serif' }}>
                          EMAIL
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="your@email.com"
                          className={`focus:border-blue-400 transition-colors min-h-[50px] ${
                            isDarkMode 
                              ? 'bg-white/10 border-white/20 text-white placeholder:text-white/50' 
                              : 'bg-black/10 border-black/20 text-black placeholder:text-black/50'
                          }`}
                          style={{ fontFamily: '"Satoshi", sans-serif' }}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* YOUR BUSINESS Section */}
                  <div className="space-y-4">
                    <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-black'}`} style={{ fontFamily: '"Satoshi", sans-serif' }}>
                      YOUR BUSINESS <span className={`text-sm font-light ${isDarkMode ? 'text-white/60' : 'text-black/60'}`} style={{ fontFamily: '"Satoshi", sans-serif' }}>(What do you do?)</span>
                    </h3>
                    
                    <Textarea
                      name="business"
                      value={formData.business}
                      onChange={handleChange}
                      placeholder="Tell me about your business or project..."
                      className={`min-h-[96px] resize-none transition-colors ${
                        isDarkMode 
                          ? 'bg-white/10 border-white/20 text-white placeholder:text-white/50' 
                          : 'bg-black/10 border-black/20 text-black placeholder:text-black/50'
                      }`}
                      style={{ fontFamily: '"Satoshi", sans-serif' }}
                      required
                    />
                  </div>

                  {/* WHAT NEEDS TO BE DONE Section */}
                  <div className="space-y-4">
                    <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-black'}`} style={{ fontFamily: '"Satoshi", sans-serif' }}>
                      WHAT NEEDS TO BE DONE? <span className={`text-sm font-light ${isDarkMode ? 'text-white/60' : 'text-black/60'}`} style={{ fontFamily: '"Satoshi", sans-serif' }}>(select multiple)</span>
                    </h3>
                    
                    <div className="grid sm:grid-cols-2 gap-3">
                      {['User Experience', 'Brand/Identity', 'Motion/Interaction', 'Other'].map((service) => (
                        <label key={service} className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
                          formData.services.includes(service)
                            ? 'border-2' 
                            : isDarkMode 
                              ? 'bg-white/5 border-white/20 hover:bg-white/10' 
                              : 'bg-black/5 border-black/20 hover:bg-black/10'
                        } border`} style={formData.services.includes(service) ? { backgroundColor: '#00fcd2', borderColor: '#00fcd2' } : {}}>
                          <input
                            type="checkbox"
                            checked={formData.services.includes(service)}
                            onChange={() => handleServiceChange(service)}
                            className="sr-only"
                          />
                          <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                            formData.services.includes(service)
                              ? 'border-2'
                              : isDarkMode 
                                ? 'border-white/40' 
                                : 'border-black/40'
                          }`} style={formData.services.includes(service) ? { backgroundColor: '#00fcd2', borderColor: '#00fcd2' } : {}}>
                            {formData.services.includes(service) && (
                              <CheckCircle className="w-3 h-3 text-black" />
                            )}
                          </div>
                          <span className={isDarkMode ? 'text-white/90' : 'text-black/90'} style={{ fontFamily: '"Satoshi", sans-serif' }}>{service}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* IDEAL TIMEFRAME Section */}
                  <div className="space-y-4">
                    <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-black'}`} style={{ fontFamily: '"Satoshi", sans-serif' }}>
                      IDEAL TIMEFRAME
                    </h3>
                    
                    <div className="grid sm:grid-cols-2 gap-3">
                      {['ASAP', '2-4 weeks', '1-2 months', 'Not sure, help me out!'].map((timeframe) => (
                        <label key={timeframe} className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
                          formData.timeframe === timeframe
                            ? 'border-2'
                            : isDarkMode 
                              ? 'bg-white/5 border-white/20 hover:bg-white/10' 
                              : 'bg-black/5 border-black/20 hover:bg-black/10'
                        } border`} style={formData.timeframe === timeframe ? { backgroundColor: '#00fcd2', borderColor: '#00fcd2' } : {}}>
                          <input
                            type="radio"
                            name="timeframe"
                            value={timeframe}
                            checked={formData.timeframe === timeframe}
                            onChange={handleChange}
                            className="sr-only"
                          />
                          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                            formData.timeframe === timeframe
                              ? 'border-2'
                              : isDarkMode 
                                ? 'border-white/40' 
                                : 'border-black/40'
                          }`} style={formData.timeframe === timeframe ? { backgroundColor: '#00fcd2', borderColor: '#00fcd2' } : {}}>
                            {formData.timeframe === timeframe && (
                              <div className="w-2 h-2 bg-black rounded-full"></div>
                            )}
                          </div>
                          <span className={isDarkMode ? 'text-white/90' : 'text-black/90'} style={{ fontFamily: '"Satoshi", sans-serif' }}>{timeframe}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* ANYTHING ELSE Section */}
                  <div className="space-y-4">
                    <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-black'}`} style={{ fontFamily: '"Satoshi", sans-serif' }}>
                      ANYTHING ELSE I NEED TO KNOW?
                    </h3>
                    
                    <Textarea
                      name="additionalInfo"
                      value={formData.additionalInfo}
                      onChange={handleChange}
                      placeholder="Type here..."
                      className={`min-h-[128px] resize-none transition-colors ${
                        isDarkMode 
                          ? 'bg-white/10 border-white/20 text-white placeholder:text-white/50' 
                          : 'bg-black/10 border-black/20 text-black placeholder:text-black/50'
                      }`}
                      style={{ fontFamily: '"Satoshi", sans-serif' }}
                    />
                  </div>

                  {/* CAPTCHA Section */}
                  <div className="space-y-4">
                    <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-black'}`} style={{ fontFamily: '"Satoshi", sans-serif' }}>
                      VERIFICATION
                    </h3>
                    
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="captcha-question" className={`text-sm font-medium ${isDarkMode ? 'text-white/80' : 'text-black/80'}`} style={{ fontFamily: '"Satoshi", sans-serif' }}>
                          SOLVE THIS PROBLEM
                        </label>
                        <div className={`flex items-center justify-center p-4 rounded-lg border text-center min-h-[50px] ${
                          isDarkMode 
                            ? 'bg-white/5 border-white/10 text-white' 
                            : 'bg-black/5 border-black/10 text-black'
                        }`}>
                          <span className="text-2xl font-medium" style={{ fontFamily: '"Satoshi", sans-serif' }}>
                            {mathProblem.num1} + {mathProblem.num2} = ?
                          </span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <label htmlFor="captcha" className={`text-sm font-medium ${isDarkMode ? 'text-white/80' : 'text-black/80'}`} style={{ fontFamily: '"Satoshi", sans-serif' }}>
                            YOUR ANSWER
                          </label>
                          <button
                            type="button"
                            onClick={() => {
                              setMathProblem(generateMathProblem());
                              setCaptchaInput('');
                              setCaptchaError(false);
                            }}
                            className="text-xs px-2 py-1 rounded transition-colors"
                            style={{ color: '#00fcd2', fontFamily: '"Satoshi", sans-serif' }}
                          >
                            New Problem
                          </button>
                        </div>
                        <div className={`flex items-center justify-center p-4 rounded-lg border min-h-[50px] ${
                          captchaError ? 'border-red-500 bg-red-500/10' : ''
                        } ${
                          isDarkMode 
                            ? 'bg-white/5 border-white/10' 
                            : 'bg-black/5 border-black/10'
                        }`}>
                          <input
                            id="captcha"
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            value={captchaInput}
                            onChange={(e) => {
                              // Only allow numbers
                              const value = e.target.value.replace(/[^0-9]/g, '');
                              setCaptchaInput(value);
                              setCaptchaError(false);
                            }}
                            placeholder="?"
                            className={`text-2xl font-medium text-center bg-transparent border-none outline-none w-full ${
                              isDarkMode 
                                ? 'text-white placeholder:text-white/30' 
                                : 'text-black placeholder:text-black/30'
                            }`}
                            style={{ 
                              fontFamily: '"Satoshi", sans-serif',
                              appearance: 'none',
                              MozAppearance: 'textfield'
                            }}
                            required
                          />
                        </div>
                        {captchaError && (
                          <p className="text-red-400 text-sm mt-1" style={{ fontFamily: '"Satoshi", sans-serif' }}>
                            Incorrect answer. Please try again.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <Button 
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full shadow-xl group text-lg h-[54px] rounded-lg font-medium transition-all duration-300 border-0"
                    style={{
                      backgroundColor: '#00fcd2',
                      color: 'black',
                      borderRadius: '8px',
                      boxShadow: '0 25px 50px -12px rgba(0, 252, 210, 0.25)'
                    }}
                    onMouseEnter={(e) => {
                      if (!isSubmitting) {
                        e.currentTarget.style.opacity = '0.9';
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = '1';
                    }}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        <span style={{ fontFamily: '"Satoshi", sans-serif' }}>Sending...</span>
                      </div>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-3 group-hover:translate-x-1 transition-transform" />
                        <span style={{ fontFamily: '"Satoshi", sans-serif' }}>Submit</span>
                      </>
                    )}
                  </Button>
                </form>
      </CardContent>
    </Card>
  );
}