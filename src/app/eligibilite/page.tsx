'use client';

import { useState, useEffect } from 'react';
import { CheckCircle2, Send, AlertCircle, Building2, Users, Shield, ArrowLeft, Sparkles, Lock, Mail, CreditCard } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

type Answer = {
  questionId: string;
  answer: string | string[];
};

type Question = {
  id: string;
  text: string;
  type: 'text' | 'radio' | 'email' | 'checkbox';
  options?: string[];
  placeholder?: string;
  condition?: (answers: Answer[]) => boolean;
};

export default function EligibilitePage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<'siret' | 'questions' | 'complete'>('siret');
  const [siretInput, setSiretInput] = useState('');
  const [companyInfo, setCompanyInfo] = useState<any>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<string[]>([]);
  const [eligibilityResult, setEligibilityResult] = useState<any>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [error, setError] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');

    const questions: Question[] = [
      { id: 'email', text: 'Email de contact', type: 'email', placeholder: 'contact@entreprise.fr' },
      { 
        id: 'hadPentest', 
        text: 'Avons-nous déjà réalisé un pentest au sein de votre entreprise ?', 
        type: 'radio',
        options: ['Oui', 'Non']
      },
      { 
        id: 'location', 
        text: 'Êtes-vous établi et domicilié en France ?', 
        type: 'radio',
        options: ['Oui', 'Non']
      },
      { 
        id: 'employeeCount', 
        text: 'Combien d\'employés compte votre entreprise ?', 
        type: 'radio',
        options: ['Moins de 250', '250 à 999', '1000 ou plus']
      },
      { 
        id: 'revenue', 
        text: 'Quel est votre chiffre d\'affaires annuel ?', 
        type: 'radio',
        options: ['Moins de 20 millions d\'euros', '20 millions d\'euros ou plus']
      },
      { 
        id: 'sector', 
        text: 'Votre entreprise relève-t-elle de l\'un des secteurs suivants ?', 
        type: 'checkbox',
        options: [
          'Santé',
          'Banque, assurance et services financiers réglementés',
          'Énergie, utilities, transport aérien, ferroviaire ou maritime',
          'Secteur réglementé ou soumis à agrément',
          'Aucun de ces secteurs'
        ]
      },
      { 
        id: 'previousPentest', 
        text: 'Un test d\'intrusion professionnel a-t-il été réalisé sur votre infrastructure au cours des 36 derniers mois ?', 
        type: 'radio',
        options: ['Oui', 'Non']
      },
      { 
        id: 'ownership', 
        text: 'Êtes-vous propriétaire ou titulaire des autorisations nécessaires sur tous les systèmes à tester ?', 
        type: 'radio',
        options: ['Oui', 'Non']
      },
      { 
        id: 'thirdPartySystem', 
        text: 'Le périmètre de test inclut-il des systèmes appartenant à des tiers ?', 
        type: 'radio',
        options: ['Oui', 'Non']
      },
      { 
        id: 'cloudServices', 
        text: 'Le périmètre de test porte-t-il sur des services cloud, plateformes SaaS ou infrastructures gérées par un fournisseur externe ?', 
        type: 'radio',
        options: ['Oui', 'Non']
      },
    ];

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSiretSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!siretInput.trim()) return;

    setIsChecking(true);
    setError('');

    try {
      const response = await fetch('/api/company/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ siret: siretInput.trim() }),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.error || 'Erreur de vérification');
        setIsChecking(false);
        return;
      }

      setCompanyInfo(result.company);
      setCurrentStep('questions');
      setSiretInput('');
    } catch (err) {
      setError('Erreur de connexion au serveur');
    } finally {
      setIsChecking(false);
    }
  };

  const getVisibleQuestions = () => {
    return questions.filter(q => !q.condition || q.condition(answers));
  };

  const getCurrentQuestion = () => {
    const visibleQuestions = getVisibleQuestions();
    return visibleQuestions[answers.length];
  };

  const handlePrevious = () => {
    if (answers.length > 0) {
      const newAnswers = answers.slice(0, -1);
      setAnswers(newAnswers);
      setCurrentInput('');
      setSelectedCheckboxes([]);
      setEmailError('');
    } else {
      // Go back to SIRET step
      setCurrentStep('siret');
      setCompanyInfo(null);
    }
  };

  const handleBackFromResults = () => {
    setCurrentStep('questions');
    setEligibilityResult(null);
  };

  const toggleCheckbox = (option: string) => {
    setSelectedCheckboxes(prev => {
      if (prev.includes(option)) {
        return prev.filter(item => item !== option);
      } else {
        return [...prev, option];
      }
    });
  };

  const handleAnswerSubmit = (value?: string) => {
    const currentQuestion = getCurrentQuestion();
    if (!currentQuestion) return;

    let answerValue: string | string[];

    if (currentQuestion.type === 'checkbox') {
      if (selectedCheckboxes.length === 0) return;
      answerValue = selectedCheckboxes;
    } else {
      answerValue = value || currentInput.trim();
      if (!answerValue) return;
    }

    // Validate email if it's an email question
    if (currentQuestion.type === 'email' && typeof answerValue === 'string') {
      if (!validateEmail(answerValue)) {
        setEmailError('Veuillez entrer une adresse email valide');
        return;
      }
      setEmailError('');
    }

    const newAnswers = [...answers, { 
      questionId: currentQuestion.id, 
      answer: answerValue
    }];
    setAnswers(newAnswers);
    setCurrentInput('');
    setSelectedCheckboxes([]);

    // Check if user answered "Oui" to hadPentest question
    if (currentQuestion.id === 'hadPentest' && answerValue === 'Oui') {
      // Immediately redirect to non-eligible page
      sessionStorage.setItem('eligibilityData', JSON.stringify({
        company: companyInfo,
        answers: newAnswers,
        eligible: false,
        reason: 'Vous avez déjà bénéficié d\'un pentest avec SecuriTrust.'
      }));
      router.push('/non-eligible-offre-15');
      return;
    }

    const visibleQuestions = getVisibleQuestions();
    if (newAnswers.length >= visibleQuestions.length) {
      checkEligibility(newAnswers);
    }
  };

    const checkEligibility = async (finalAnswers: Answer[]) => {
      setIsChecking(true);
      setCurrentStep('complete');

      try {
        const hadPentestAnswer = finalAnswers.find(a => a.questionId === 'hadPentest')?.answer;
        const locationAnswer = finalAnswers.find(a => a.questionId === 'location')?.answer;
        const employeeCountAnswer = finalAnswers.find(a => a.questionId === 'employeeCount')?.answer;
        const revenueAnswer = finalAnswers.find(a => a.questionId === 'revenue')?.answer;
        const sectorAnswer = finalAnswers.find(a => a.questionId === 'sector')?.answer;
        const previousPentestAnswer = finalAnswers.find(a => a.questionId === 'previousPentest')?.answer;
        const ownershipAnswer = finalAnswers.find(a => a.questionId === 'ownership')?.answer;
        const thirdPartySystemAnswer = finalAnswers.find(a => a.questionId === 'thirdPartySystem')?.answer;
        const cloudServicesAnswer = finalAnswers.find(a => a.questionId === 'cloudServices')?.answer;

        let isEligible = true;
        let reason = '';

          if (hadPentestAnswer === 'Oui') {
            isEligible = false;
            reason = 'Vous avez déjà bénéficié d\'un pentest avec SecuriTrust.';
          } else if (locationAnswer === 'Non') {
            isEligible = false;
            reason = 'L\'offre est réservée aux entreprises établies et domiciliées en France.';
          } else if (employeeCountAnswer === '250 à 999' || employeeCountAnswer === '1000 ou plus') {
            isEligible = false;
            reason = 'Votre entreprise doit employer moins de 250 salariés.';
          } else if (revenueAnswer === '20 millions d\'euros ou plus') {
            isEligible = false;
            reason = 'Votre chiffre d\'affaires annuel doit être inférieur à 20 millions d\'euros.';
          } else if (Array.isArray(sectorAnswer) && sectorAnswer.some(s => s !== 'Aucun de ces secteurs')) {
            isEligible = false;
            reason = 'Votre secteur d\'activité n\'est pas éligible à cette offre.';
          } else if (previousPentestAnswer === 'Oui') {
            isEligible = false;
            reason = 'Un test d\'intrusion professionnel a déjà été réalisé au cours des 36 derniers mois.';
          } else if (ownershipAnswer === 'Non') {
            isEligible = false;
            reason = 'Vous devez être propriétaire ou détenir les autorisations nécessaires sur tous les systèmes à tester.';
          } else if (thirdPartySystemAnswer === 'Oui') {
            isEligible = false;
            reason = 'Le périmètre ne doit pas inclure de systèmes appartenant à des tiers.';
          } else if (cloudServicesAnswer === 'Oui') {
            isEligible = false;
            reason = 'Le test ne peut porter sur des services cloud, SaaS ou infrastructures gérées par un fournisseur externe.';
          }

        if (!isEligible || companyInfo.status !== 'ACTIVE') {
          sessionStorage.setItem('eligibilityData', JSON.stringify({
            company: companyInfo,
            answers: finalAnswers,
            eligible: false,
            reason: companyInfo.status !== 'ACTIVE' ? 'Entreprise inactive.' : reason
          }));
          router.push('/non-eligible-offre-15');
          return;
        }
        
        const result = {
          eligible: true,
          company: companyInfo,
          answers: finalAnswers,
          message: `✓ Félicitations ! ${companyInfo.name} est éligible à notre offre promotionnelle.`,
          benefits: [
            'Test d\'intrusion complet',
            'Remboursement intégral si aucune vulnérabilité CVSS ≥7',
            'Rapport détaillé et recommandations',
            'Accompagnement personnalisé',
            'Support prioritaire',
          ],
        };

        setEligibilityResult(result);
      } catch (err) {
        setEligibilityResult({
          eligible: false,
          message: 'Erreur lors de la vérification',
        });
      } finally {
        setIsChecking(false);
      }
    };

  const handleViewProposal = () => {
    sessionStorage.setItem('eligibilityData', JSON.stringify({
      company: companyInfo,
      answers: answers,
      eligibilityResult: eligibilityResult
    }));
    router.push('/proposition');
  };

  const currentQuestion = getCurrentQuestion();
  const visibleQuestions = getVisibleQuestions();
  const progress = currentStep === 'questions' ? (answers.length / visibleQuestions.length) * 100 : 0;

  return (
    <div className="min-h-screen bg-[#02040a] relative overflow-hidden">
      {/* Background Grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(to right, #1e293b 1px, transparent 1px), linear-gradient(to bottom, #1e293b 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          opacity: 0.05,
        }}
      ></div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="stars"></div>
      </div>

      {/* Back Button */}
      <div className="fixed top-6 left-6 z-50">
        <Link
          href="/"
          className="flex items-center gap-2 px-4 py-2 bg-[#0b1221]/80 backdrop-blur-sm border border-white/10 rounded-lg text-cyan-400 hover:bg-[#0b1221] hover:border-cyan-500/50 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Retour</span>
        </Link>
      </div>

      {/* Logo SecuriTrust - Top Center */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
        <Image
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/Logo-SecuriTrust-bleu-blanc-768x158-1764868575260.png"
          alt="SecuriTrust"
          width={160}
          height={33}
          className="h-8 w-auto"
          priority
        />
      </div>

      <div className="max-w-2xl mx-auto px-6 py-24 relative z-10">
        {/* Garantie Remboursement Badge */}
        <div className="mb-6 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-cyan-500/10 border border-cyan-500/30 rounded-2xl p-4 backdrop-blur-sm">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-cyan-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-cyan-300 mb-1">
                Garantie Pentest Remboursé*
              </h3>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Pentest au résultat, SecuriTrust innove avec une offre unique : pas de vulnérabilité AD, pentest remboursé.
              </p>
            </div>
          </div>
        </div>

        {/* Card Container */}
        <div className="sm:px-10 sm:py-10 bg-gradient-to-b from-neutral-900 via-neutral-900 to-neutral-800 max-w-lg border-neutral-800 border rounded-3xl mx-auto pt-8 pr-6 pb-8 pl-6 relative shadow-xl">
          {/* Top glow dots */}
          <div className="absolute left-10 top-5 hidden h-1.5 w-16 rounded-full bg-neutral-700/60 sm:block"></div>
          <div className="absolute right-10 top-5 hidden h-1.5 w-10 rounded-full bg-neutral-700/30 sm:block"></div>

          {/* Logo */}
          <div className="flex justify-center">
            <div className="flex bg-neutral-900 w-14 h-14 rounded-2xl relative shadow-[0_0_0_1px_rgba(82,82,91,0.7)] items-center justify-center">
              <div className="flex bg-neutral-950 w-10 h-10 rounded-2xl relative items-center justify-center">
                <Shield className="w-6 h-6 text-cyan-400" />
              </div>
            </div>
          </div>

          {/* Heading */}
          <div className="mt-6 text-center">
            <h1 className="text-[22px] leading-tight tracking-tight font-semibold text-neutral-50">
              Test d'Éligibilité
            </h1>
            <p className="mt-2 text-sm font-normal text-neutral-400">
              {currentStep === 'siret' && 'Vérifiez votre éligibilité'}
              {currentStep === 'questions' && `Question ${answers.length + 1} sur ${visibleQuestions.length}`}
              {currentStep === 'complete' && 'Analyse terminée'}
            </p>
          </div>

          {/* Progress bar for questions */}
          {currentStep === 'questions' && (
            <div className="mt-6 w-full bg-neutral-800 rounded-full h-1.5">
              <div 
                className="bg-gradient-to-r from-cyan-500 to-blue-500 h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          )}

          {/* Company Info Display */}
          {companyInfo && currentStep !== 'siret' && (
            <div className="mt-6 bg-neutral-950/60 border border-neutral-800 rounded-xl p-4 space-y-2">
              <div className="flex items-start gap-2">
                <Building2 className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-white font-semibold text-sm">{companyInfo.name}</div>
                  <div className="text-neutral-400 text-xs">{companyInfo.activityLabel}</div>
                </div>
              </div>
            </div>
          )}

          {/* Form Content */}
          <div className="mt-8">
            {/* SIRET Input Step */}
            {currentStep === 'siret' && (
              <form onSubmit={handleSiretSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label htmlFor="siret" className="block text-xs font-medium uppercase tracking-[0.16em] text-neutral-400">
                    SIRET de votre entreprise
                  </label>
                  <div className="flex items-center rounded-xl border border-neutral-800 bg-neutral-950/60 px-3 py-2.5 text-sm text-neutral-100 shadow-inner shadow-black/40 focus-within:border-cyan-500 focus-within:ring-1 focus-within:ring-cyan-500/70">
                    <Building2 className="h-4 w-4 text-neutral-500" />
                    <input
                      id="siret"
                      type="text"
                      value={siretInput}
                      onChange={(e) => setSiretInput(e.target.value)}
                      placeholder="12345678901234"
                      maxLength={14}
                      className="ml-3 flex-1 bg-transparent text-sm font-normal text-neutral-100 placeholder:text-neutral-600 focus:outline-none"
                      disabled={isChecking}
                    />
                  </div>
                  {error && (
                    <div className="flex items-center gap-2 text-xs text-red-400 mt-2">
                      <AlertCircle className="w-3 h-3" />
                      {error}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isChecking || !siretInput.trim()}
                  className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-cyan-500 px-4 py-2.5 text-sm font-semibold text-neutral-900 shadow-[0_14px_35px_rgba(6,182,212,0.55)] hover:bg-cyan-400 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-500/80 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isChecking ? 'Vérification...' : 'Continuer'}
                </button>
              </form>
            )}

            {/* Questions Step */}
            {currentStep === 'questions' && currentQuestion && (
              <div className="space-y-5">
                <div className="space-y-2">
                  <label className="block text-xs font-medium uppercase tracking-[0.16em] text-neutral-400">
                    {currentQuestion.text}
                    {currentQuestion.type === 'checkbox' && (
                      <span className="ml-2 text-cyan-400 normal-case tracking-normal">(Plusieurs choix possibles)</span>
                    )}
                  </label>

                  {(currentQuestion.type === 'text' || currentQuestion.type === 'email') ? (
                    <>
                      <div className="flex items-center rounded-xl border border-neutral-800 bg-neutral-950/60 px-3 py-2.5 text-sm text-neutral-100 shadow-inner shadow-black/40 focus-within:border-cyan-500 focus-within:ring-1 focus-within:ring-cyan-500/70">
                        <Mail className="h-4 w-4 text-neutral-500" />
                        <input
                          type={currentQuestion.type === 'email' ? 'email' : 'text'}
                          value={currentInput}
                          onChange={(e) => {
                            setCurrentInput(e.target.value);
                            if (emailError) setEmailError('');
                          }}
                          onKeyPress={(e) => e.key === 'Enter' && handleAnswerSubmit()}
                          placeholder={currentQuestion.placeholder}
                          className="ml-3 flex-1 bg-transparent text-sm font-normal text-neutral-100 placeholder:text-neutral-600 focus:outline-none"
                          autoFocus
                        />
                      </div>
                      {emailError && (
                        <div className="flex items-center gap-2 text-xs text-red-400 mt-2">
                          <AlertCircle className="w-3 h-3" />
                          {emailError}
                        </div>
                      )}
                    </>
                  ) : currentQuestion.type === 'checkbox' ? (
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {currentQuestion.options?.map((option, idx) => (
                        <button
                          key={idx}
                          onClick={() => toggleCheckbox(option)}
                          className={`w-full text-left px-4 py-3 rounded-xl border text-sm font-medium transition flex items-center gap-3 ${
                            selectedCheckboxes.includes(option)
                              ? 'border-cyan-500 bg-cyan-500/10 text-cyan-200'
                              : 'border-neutral-800 bg-neutral-900 text-neutral-200 hover:border-cyan-500/50 hover:bg-neutral-800/80'
                          }`}
                        >
                          <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                            selectedCheckboxes.includes(option)
                              ? 'border-cyan-400 bg-cyan-500'
                              : 'border-neutral-600'
                          }`}>
                            {selectedCheckboxes.includes(option) && (
                              <CheckCircle2 className="w-3 h-3 text-white" />
                            )}
                          </div>
                          <span className="flex-1">{option}</span>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {currentQuestion.options?.map((option, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleAnswerSubmit(option)}
                          className="w-full text-left px-4 py-3 rounded-xl border border-neutral-800 bg-neutral-900 text-sm font-medium text-neutral-200 hover:border-cyan-500/50 hover:bg-neutral-800/80 transition flex items-center gap-2"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400"></div>
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handlePrevious}
                    className="inline-flex items-center justify-center rounded-full border border-neutral-800 bg-neutral-900 px-4 py-2.5 text-sm font-medium text-neutral-200 hover:border-cyan-500/50 hover:bg-neutral-800/80 transition"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Précédent
                  </button>

                  {(currentQuestion.type === 'text' || currentQuestion.type === 'email') && (
                    <button
                      onClick={() => handleAnswerSubmit()}
                      disabled={!currentInput.trim()}
                      className="flex-1 inline-flex items-center justify-center rounded-full bg-cyan-500 px-4 py-2.5 text-sm font-semibold text-neutral-900 shadow-[0_14px_35px_rgba(6,182,212,0.55)] hover:bg-cyan-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Suivant
                    </button>
                  )}

                  {currentQuestion.type === 'checkbox' && (
                    <button
                      onClick={() => handleAnswerSubmit()}
                      disabled={selectedCheckboxes.length === 0}
                      className="flex-1 inline-flex items-center justify-center rounded-full bg-cyan-500 px-4 py-2.5 text-sm font-semibold text-neutral-900 shadow-[0_14px_35px_rgba(6,182,212,0.55)] hover:bg-cyan-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Suivant
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Results Step */}
            {currentStep === 'complete' && (
              <div className="space-y-5">
                {isChecking ? (
                  <div className="text-center py-8">
                    <div className="inline-flex items-center gap-2 text-cyan-400">
                      <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-sm">Analyse en cours...</span>
                    </div>
                  </div>
                ) : eligibilityResult ? (
                  <div className="space-y-4">
                    <div className={`p-6 border rounded-xl ${
                      eligibilityResult.eligible
                        ? 'bg-cyan-500/10 border-cyan-500/30'
                        : 'bg-red-500/10 border-red-500/30'
                    }`}>
                      <div className="flex items-center gap-3 mb-3">
                        {eligibilityResult.eligible ? (
                          <CheckCircle2 className="w-6 h-6 text-cyan-400" />
                        ) : (
                          <AlertCircle className="w-6 h-6 text-red-400" />
                        )}
                        <span className={`font-semibold text-lg ${
                          eligibilityResult.eligible ? 'text-cyan-300' : 'text-red-300'
                        }`}>
                          {eligibilityResult.eligible ? 'ÉLIGIBLE' : 'NON ÉLIGIBLE'}
                        </span>
                      </div>
                      <p className={`text-sm ${
                        eligibilityResult.eligible ? 'text-cyan-200' : 'text-red-200'
                      }`}>
                        {eligibilityResult.message}
                      </p>
                    </div>

                    {eligibilityResult.eligible && eligibilityResult.benefits && (
                      <div className="space-y-3">
                        <div className="text-cyan-400 font-semibold text-sm uppercase tracking-wide">
                          Avantages inclus
                        </div>
                        <div className="space-y-2">
                          {eligibilityResult.benefits.map((benefit: string, idx: number) => (
                            <div key={idx} className="flex items-start gap-2 text-neutral-300 text-sm">
                              <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                              <span>{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="pt-4 flex flex-col gap-3">
                      {eligibilityResult.eligible && (
                        <button
                          onClick={handleViewProposal}
                          className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-2.5 text-sm font-semibold text-white shadow-[0_14px_35px_rgba(6,182,212,0.55)] hover:from-cyan-400 hover:to-blue-400 transition"
                        >
                          Voir ma proposition commerciale
                        </button>
                      )}
                      <button
                        onClick={handleBackFromResults}
                        className="inline-flex w-full items-center justify-center rounded-full border border-neutral-800 bg-neutral-900 px-4 py-2.5 text-sm font-medium text-neutral-200 hover:border-cyan-500/50 hover:bg-neutral-800/80 transition"
                      >
                        Retour aux questions
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>
            )}
          </div>

          {/* Footer text */}
          {currentStep === 'siret' && (
            <p className="pt-4 text-[11px] leading-relaxed text-neutral-500 text-center">
              Vos données sont sécurisées et ne seront utilisées que pour évaluer votre éligibilité.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}