/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Gamepad2, 
  HelpCircle, 
  Sparkles, 
  ChevronRight, 
  ArrowLeft, 
  Check, 
  X, 
  Volume2, 
  RotateCcw, 
  Award, 
  Crown, 
  Smile, 
  Info, 
  MessageSquare, 
  BookMarked,
  Layers,
  TrendingUp,
  Flame,
  Globe,
  Trophy,
  Activity,
  User,
  ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  dialogueLines, 
  vocabularyItems, 
  readingSentences, 
  textVerbs, 
  trainGameData, 
  balloonLevels, 
  classificationVerbs, 
  sentencesPuzzles, 
  DialogueLine,
  ReadingSentence,
  VocabularyItem,
  EndingsGameMatch,
  BalloonLevel,
  ClassificationVerb,
  SentencePuzzle,
  millionaireQuestions,
  MillionaireQuestion
} from './data';

export default function App() {
  // General navigation state
  const [activeTab, setActiveTab] = useState<'reading' | 'games' | 'rules'>('reading');
  const [readingTab, setReadingTab] = useState<'dialog' | 'story' | 'vocab'>('dialog');
  const [activeGame, setActiveGame] = useState<number | null>(null);

  // App metrics
  const [score, setScore] = useState<number>(0);
  const [completedGames, setCompletedGames] = useState<string[]>([]);
  const [dialogRevealed, setDialogRevealed] = useState<Record<string, boolean>>({});
  const [storyRevealed, setStoryRevealed] = useState<Record<string, boolean>>({});
  const [audioFeedback, setAudioFeedback] = useState<string | null>(null);

  // NEW GAME 1: MILLIONAIRE STATES
  const [milPlayer, setMilPlayer] = useState<1 | 2>(1);
  const [milState, setMilState] = useState<'lobby' | 'playing' | 'p1_finished' | 'p2_finished' | 'game_over'>('lobby');
  const [milCurrentQ, setMilCurrentQ] = useState<number>(0); // 0 to 14
  const [milTimer, setMilTimer] = useState<number>(300); // 300 seconds (5 minutes)
  const [milSelectedOption, setMilSelectedOption] = useState<string | null>(null);
  const [milP1Score, setMilP1Score] = useState<number>(0);
  const [milP2Score, setMilP2Score] = useState<number>(0);
  const [milP1TimeSpent, setMilP1TimeSpent] = useState<number>(0);
  const [milP2TimeSpent, setMilP2TimeSpent] = useState<number>(0);
  const [milAnswerChecked, setMilAnswerChecked] = useState<boolean>(false);
  const [milIsCorrect, setMilIsCorrect] = useState<boolean | null>(null);

  // GAME 2 STATES (Balloon Pop Suffix)
  const [g2Level, setG2Level] = useState<number>(0); // 0 to 4
  const [g2Score, setG2Score] = useState<number>(0);
  const [g2SelectedOption, setG2SelectedOption] = useState<string | null>(null);
  const [g2IsCorrect, setG2IsCorrect] = useState<boolean | null>(null);
  const [g2Finished, setG2Finished] = useState<boolean>(false);

  // GAME 3 STATES (Regular vs Irregular Chests)
  const [g3Index, setG3Index] = useState<number>(0);
  const [g3Score, setG3Score] = useState<number>(0);
  const [g3SelectedChest, setG3SelectedChest] = useState<'regular' | 'irregular' | null>(null);
  const [g3Feedback, setG3Feedback] = useState<{ isCorrect: boolean; text: string } | null>(null);
  const [g3Finished, setG3Finished] = useState<boolean>(false);

  // GAME 4 STATES (Sentence Detective)
  const [g4Level, setG4Level] = useState<number>(0); // 0 to 3
  const [g4SelectedWords, setG4SelectedWords] = useState<string[]>([]);
  const [g4Score, setG4Score] = useState<number>(0);
  const [g4Checked, setG4Checked] = useState<boolean>(false);
  const [g4IsCorrect, setG4IsCorrect] = useState<boolean | null>(null);
  const [g4Finished, setG4Finished] = useState<boolean>(false);

  // GAME 5 STATES (Magic Memory Match)
  const [g5Cards, setG5Cards] = useState<{ id: number; text: string; pairId: string; isFlipped: boolean; isMatched: boolean }[]>([]);
  const [g5SelectedIndices, setG5SelectedIndices] = useState<number[]>([]);
  const [g5Moves, setG5Moves] = useState<number>(0);
  const [g5Finished, setG5Finished] = useState<boolean>(false);



  // Verb focus tooltip state in Reading sections
  const [focusedVerb, setFocusedVerb] = useState<{ es: string; am: string; base: string; pronoun: string } | null>(null);

  // Local storage for score persistence
  useEffect(() => {
    const savedScore = localStorage.getItem('ispaner_score');
    if (savedScore) {
      setScore(parseInt(savedScore, 10));
    }
    const savedGames = localStorage.getItem('ispaner_completed_games');
    if (savedGames) {
      setCompletedGames(JSON.parse(savedGames));
    }
  }, []);

  const triggerAudioFeedback = (msg: string) => {
    setAudioFeedback(msg);
    setTimeout(() => setAudioFeedback(null), 2500);
  };

  const updateGlobalScore = (points: number) => {
    const newScore = Math.max(0, score + points);
    setScore(newScore);
    localStorage.setItem('ispaner_score', newScore.toString());
  };

  const completeGame = (gameId: string, pointsReward: number) => {
    if (!completedGames.includes(gameId)) {
      const newCompleted = [...completedGames, gameId];
      setCompletedGames(newCompleted);
      localStorage.setItem('ispaner_completed_games', JSON.stringify(newCompleted));
      updateGlobalScore(pointsReward);
    }
  };

  // Switch tabs & reset intermediate states
  const switchMainTab = (tab: 'reading' | 'games' | 'rules') => {
    setActiveTab(tab);
    setActiveGame(null);
  };

  // Helper function to render Armenian explanation bubbles elegantly
  const renderAmTip = (text: string) => (
    <div className="flex items-start gap-2.5 p-3.5 bg-amber-50 border-l-4 border-amber-400 rounded-r-xl text-amber-900 text-sm md:text-base mb-4 font-fredoka shadow-sm shadow-amber-100 animate-fade-in">
      <Info className="w-5 h-5 shrink-0 text-amber-500 mt-0.5" />
      <div>{text}</div>
    </div>
  );

  // --- GAME 1 LOGIC (Who Wants to Be a Millionaire - 15 Questions, 2 Players) ---
  
  // Countdown Timer for Millionaire Game
  useEffect(() => {
    let interval: any = null;
    if (activeGame === 1 && milState === 'playing') {
      interval = setInterval(() => {
        setMilTimer(prev => {
          if (prev <= 1) {
            if (interval) clearInterval(interval);
            setTimeout(() => {
              handleMilTimeUp();
            }, 0);
            return 0;
          }
          
          if (milPlayer === 1) {
            setMilP1TimeSpent(t => t + 1);
          } else {
            setMilP2TimeSpent(t => t + 1);
          }
          
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [activeGame, milState, milPlayer]);

  const handleMilTimeUp = () => {
    triggerAudioFeedback("⏰ Ժամանակը սպառվեց:");
    finishMilPlayerTurn();
  };

  const startMilGame = () => {
    setMilPlayer(1);
    setMilState('playing');
    setMilCurrentQ(0);
    setMilTimer(300);
    setMilP1Score(0);
    setMilP2Score(0);
    setMilP1TimeSpent(0);
    setMilP2TimeSpent(0);
    setMilSelectedOption(null);
    setMilAnswerChecked(false);
    setMilIsCorrect(null);
    triggerAudioFeedback("💵 Խաղացող 1-ի հերթն է: Սկսեցինք:");
  };

  const handleMilAnswer = (option: string) => {
    if (milAnswerChecked) return;
    setMilSelectedOption(option);
    setMilAnswerChecked(true);
    
    const currentQData = millionaireQuestions[milCurrentQ];
    const isCorrectChoice = option === currentQData.correctAnswer;
    setMilIsCorrect(isCorrectChoice);
    
    if (isCorrectChoice) {
      if (milPlayer === 1) {
        setMilP1Score(s => s + 1);
      } else {
        setMilP2Score(s => s + 1);
      }
      triggerAudioFeedback("🎉 Ճիշտ պատասխան: +10★");
      updateGlobalScore(10);
    } else {
      triggerAudioFeedback("❌ Սխալ պատասխան:");
    }
  };

  const handleMilNext = () => {
    const wasCorrect = milIsCorrect;
    const isLastQuestion = milCurrentQ === 14;

    setMilSelectedOption(null);
    setMilAnswerChecked(false);
    setMilIsCorrect(null);

    if (!wasCorrect || isLastQuestion) {
      finishMilPlayerTurn();
    } else {
      setMilCurrentQ(prev => prev + 1);
    }
  };

  const finishMilPlayerTurn = () => {
    if (milPlayer === 1) {
      setMilState('p1_finished');
      triggerAudioFeedback("🏆 Խաղացող 1-ը ավարտեց իր հերթը:");
    } else {
      setMilState('game_over');
      triggerAudioFeedback("🏆 Խաղն ավարտվեց։");
      const p1Final = milP1Score;
      const p2Final = milP2Score;
      const maxScore = Math.max(p1Final, p2Final);
      const pointsReward = maxScore * 10 + 50; 
      completeGame('game1', pointsReward);
    }
  };

  const startMilPlayer2 = () => {
    setMilPlayer(2);
    setMilState('playing');
    setMilCurrentQ(0);
    setMilTimer(300);
    setMilSelectedOption(null);
    setMilAnswerChecked(false);
    setMilIsCorrect(null);
    triggerAudioFeedback("💵 Խաղացող 2-ի հերթն է: Սկսեցինք:");
  };

  const resetMilGame = () => {
    setMilState('lobby');
    setMilPlayer(1);
    setMilCurrentQ(0);
    setMilTimer(300);
    setMilP1Score(0);
    setMilP2Score(0);
    setMilP1TimeSpent(0);
    setMilP2TimeSpent(0);
    setMilSelectedOption(null);
    setMilAnswerChecked(false);
    setMilIsCorrect(null);
  };

  // --- GAME 2 LOGIC (Balloon Pop Suffix) ---
  const handleG2Answer = (option: string) => {
    if (g2SelectedOption) return;
    setG2SelectedOption(option);
    const lv = balloonLevels[g2Level];
    if (option === lv.correctAnswer) {
      setG2IsCorrect(true);
      setG2Score(prev => prev + 20);
      updateGlobalScore(15);
      triggerAudioFeedback("🎈 ՊՈՊ: Փուչիկը պայթեց, ճիշտ պատասխան:");
    } else {
      setG2IsCorrect(false);
      triggerAudioFeedback(`❌ Բում: Ճիշտ տարբերակն էր ${lv.correctAnswer}-ը:`);
    }
  };

  const nextG2Level = () => {
    setG2SelectedOption(null);
    setG2IsCorrect(null);
    if (g2Level < balloonLevels.length - 1) {
      setG2Level(prev => prev + 1);
    } else {
      setG2Finished(true);
      completeGame('game2', 40);
    }
  };

  const resetG2Game = () => {
    setG2Level(0);
    setG2Score(0);
    setG2SelectedOption(null);
    setG2IsCorrect(null);
    setG2Finished(false);
  };

  // --- GAME 3 LOGIC (Regular vs Irregular) ---
  const handleG3Categorize = (chest: 'regular' | 'irregular') => {
    if (g3Feedback) return;
    const currentVerb = classificationVerbs[g3Index];
    const isCorrect = (chest === 'regular' && currentVerb.isRegular) || (chest === 'irregular' && !currentVerb.isRegular);
    
    setG3SelectedChest(chest);
    if (isCorrect) {
      setG3Score(prev => prev + 15);
      updateGlobalScore(10);
      setG3Feedback({
        isCorrect: true,
        text: `✨ Ճիշտ է: "${currentVerb.word}" բայը ${currentVerb.isRegular ? 'Կանոնավոր է (Regular)' : 'Անկանոն է (Irregular)'}:`
      });
      triggerAudioFeedback("🔓 Գանձերի սնդուկը բացվե՛ց:");
    } else {
      setG3Feedback({
        isCorrect: false,
        text: `😢 Ոչ, "${currentVerb.word}" բայը ${currentVerb.isRegular ? 'Կանոնավոր է' : 'Անկանոն է'} (Արմատը՝ ${currentVerb.stem}):`
      });
      triggerAudioFeedback("🔒 Սնդուկը մնաց փակված:");
    }
  };

  const nextG3Verb = () => {
    setG3SelectedChest(null);
    setG3Feedback(null);
    if (g3Index < classificationVerbs.length - 1) {
      setG3Index(prev => prev + 1);
    } else {
      setG3Finished(true);
      completeGame('game3', 45);
    }
  };

  const resetG3Game = () => {
    setG3Index(0);
    setG3Score(0);
    setG3SelectedChest(null);
    setG3Feedback(null);
    setG3Finished(false);
  };

  // --- GAME 4 LOGIC (Sentence Constructor) ---
  const handleG4WordClick = (word: string, fromSelected: boolean) => {
    if (g4Checked) return;
    if (fromSelected) {
      setG4SelectedWords(prev => prev.filter(w => w !== word));
    } else {
      if (!g4SelectedWords.includes(word)) {
        setG4SelectedWords(prev => [...prev, word]);
      }
    }
  };

  const handleG4Check = () => {
    const puzzle = sentencesPuzzles[g4Level];
    const isCorrect = g4SelectedWords.join(' ') === puzzle.correctOrder.join(' ');
    setG4Checked(true);
    setG4IsCorrect(isCorrect);
    
    if (isCorrect) {
      setG4Score(prev => prev + 25);
      updateGlobalScore(20);
      triggerAudioFeedback("🕵️‍♂️ Հրաշալի՛ է, բառերը ճիշտ դասավորվեցին։");
    } else {
      triggerAudioFeedback("🕵️‍♂️ Սխալ կա, ուղղիր բառերի հերթականությունը:");
    }
  };

  const nextG4Level = () => {
    setG4SelectedWords([]);
    setG4Checked(false);
    setG4IsCorrect(null);
    if (g4Level < sentencesPuzzles.length - 1) {
      setG4Level(prev => prev + 1);
    } else {
      setG4Finished(true);
      completeGame('game4', 50);
    }
  };

  const resetG4Game = () => {
    setG4Level(0);
    setG4SelectedWords([]);
    setG4Score(0);
    setG4Checked(false);
    setG4IsCorrect(null);
    setG4Finished(false);
  };

  // --- GAME 5 LOGIC (Memory Cards) ---
  const initG5Game = () => {
    // 6 matching pairs: total 12 cards
    const pairs = [
      { es: 'viajaré', am: 'ես կճանապարհորդեմ' },
      { es: 'iremos', am: 'մենք կգնանք' },
      { es: 'comeremos', am: 'մենք կուտենք' },
      { es: 'estará', am: 'նա կլինի' },
      { es: 'escribirá', am: 'նա կգրի' },
      { es: 'harás', am: 'դու կանես' },
    ];
    
    const cardList: { id: number; text: string; pairId: string; isFlipped: boolean; isMatched: boolean }[] = [];
    pairs.forEach((p, idx) => {
      cardList.push({
        id: idx * 2 + 1,
        text: p.es,
        pairId: `pair_${idx}`,
        isFlipped: false,
        isMatched: false
      });
      cardList.push({
        id: idx * 2 + 2,
        text: p.am,
        pairId: `pair_${idx}`,
        isFlipped: false,
        isMatched: false
      });
    });

    // Shuffle cards
    const shuffled = cardList.sort(() => Math.random() - 0.5);
    setG5Cards(shuffled);
    setG5SelectedIndices([]);
    setG5Moves(0);
    setG5Finished(false);
  };

  const handleG5CardClick = (index: number) => {
    if (g5Cards[index].isFlipped || g5Cards[index].isMatched || g5SelectedIndices.length >= 2) return;

    // Flip card
    const updatedCards = [...g5Cards];
    updatedCards[index].isFlipped = true;
    setG5Cards(updatedCards);

    const newSelected = [...g5SelectedIndices, index];
    setG5SelectedIndices(newSelected);

    if (newSelected.length === 2) {
      setG5Moves(prev => prev + 1);
      const [firstIdx, secondIdx] = newSelected;
      const card1 = updatedCards[firstIdx];
      const card2 = updatedCards[secondIdx];

      if (card1.pairId === card2.pairId) {
        // Matched!
        setTimeout(() => {
          const matchedCards = [...updatedCards];
          matchedCards[firstIdx].isMatched = true;
          matchedCards[secondIdx].isMatched = true;
          setG5Cards(matchedCards);
          setG5SelectedIndices([]);
          updateGlobalScore(15);
          triggerAudioFeedback("🃏 Հիանալի՛ է, զույգը գտնվեց:");

          // Check if game is finished
          if (matchedCards.every(c => c.isMatched)) {
            setG5Finished(true);
            completeGame('game5', 40);
          }
        }, 600);
      } else {
        // Not matched, flip back
        setTimeout(() => {
          const revertedCards = [...updatedCards];
          revertedCards[firstIdx].isFlipped = false;
          revertedCards[secondIdx].isFlipped = false;
          setG5Cards(revertedCards);
          setG5SelectedIndices([]);
        }, 1200);
      }
    }
  };

  // Run initialization on mounting or switching to Game 5
  useEffect(() => {
    if (activeGame === 5) {
      initG5Game();
    }
  }, [activeGame]);



  // Interactive helper to render grammatical details when hovering/clicking verbs
  const showVerbInfo = (es: string, am: string, base: string, pronoun: string) => {
    setFocusedVerb({ es, am, base, pronoun });
  };

  return (
    <div id="app_root" className="min-h-screen bg-[#F0F9FF] font-sans text-slate-800 pb-16 relative">
      
      {/* Sparkly decorative elements */}
      <div className="absolute top-4 left-4 text-amber-400 animate-pulse pointer-events-none hidden md:block">
        <Sparkles className="w-8 h-8" />
      </div>

      {/* Hero Header Area */}
      <header id="app_header" className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white shadow-lg shadow-indigo-100 rounded-b-[2rem]">
        <div className="max-w-6xl mx-auto px-4 py-6 md:py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/10 rounded-2xl border border-white/20 shadow-inner">
                <Globe className="w-8 h-8 md:w-10 md:h-10 text-amber-300 animate-spin-slow" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-200 bg-indigo-900/40 px-3 py-1 rounded-full">
                  🇪🇸 Իսպաներենի Ապառնի Ժամանակ 🇦🇲
                </span>
                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight mt-1 flex items-center gap-2">
                  Futuro Simple <span className="text-amber-300 font-fredoka">Ապառնի Ժամանակ</span>
                </h1>
              </div>
            </div>

            {/* Scoreboard and Achievements */}
            <div className="flex items-center gap-3 bg-black/20 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/10 self-start md:self-center">
              <div className="flex items-center gap-2">
                <Crown className="w-5 h-5 text-amber-300 animate-pulse" />
                <div>
                  <div className="text-[10px] text-indigo-200 uppercase tracking-widest leading-none font-bold">Միավորներ</div>
                  <div className="text-lg md:text-xl font-black text-amber-300 leading-none mt-0.5">{score} ★</div>
                </div>
              </div>
              <div className="h-6 w-[1px] bg-white/20 mx-2" />
              <div className="text-xs text-indigo-100 font-medium">
                <div className="text-[10px] text-indigo-200 uppercase tracking-widest leading-none font-bold">Խաղեր</div>
                <div className="mt-0.5 font-bold">{completedGames.length}/6 ոսկե մեդալ</div>
              </div>
            </div>

          </div>

          {/* Core Interactive Sound Feedback & Floating popups */}
          <AnimatePresence>
            {audioFeedback && (
              <motion.div 
                initial={{ opacity: 0, y: -20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="mt-4 p-3 bg-amber-400 text-slate-900 rounded-xl font-bold text-center text-sm md:text-base shadow-lg shadow-amber-500/10 border-2 border-white flex items-center justify-center gap-2"
              >
                <div className="w-2.5 h-2.5 bg-green-600 rounded-full animate-ping" />
                <Volume2 className="w-5 h-5 animate-bounce text-slate-900 inline" />
                <span>{audioFeedback}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Tab bar */}
          <div className="flex bg-indigo-900/30 rounded-xl p-1 mt-6 border border-white/10 max-w-lg">
            <button 
              id="tab_reading"
              onClick={() => switchMainTab('reading')}
              className={`flex-1 py-2 text-center rounded-lg font-bold text-xs md:text-sm tab-btn flex items-center justify-center gap-1.5 ${activeTab === 'reading' ? 'tab-active' : 'text-indigo-100 hover:bg-white/10'}`}
            >
              <BookOpen className="w-4 h-4" />
              Ընթերցանություն
            </button>
            <button 
              id="tab_games"
              onClick={() => switchMainTab('games')}
              className={`flex-1 py-2 text-center rounded-lg font-bold text-xs md:text-sm tab-btn flex items-center justify-center gap-1.5 ${activeTab === 'games' ? 'tab-active' : 'text-indigo-100 hover:bg-white/10'}`}
            >
              <Gamepad2 className="w-4 h-4" />
              Խաղատուն (6 Խաղ)
            </button>
            <button 
              id="tab_rules"
              onClick={() => switchMainTab('rules')}
              className={`flex-1 py-2 text-center rounded-lg font-bold text-xs md:text-sm tab-btn flex items-center justify-center gap-1.5 ${activeTab === 'rules' ? 'tab-active' : 'text-indigo-100 hover:bg-white/10'}`}
            >
              <BookMarked className="w-4 h-4" />
              Կանոններ
            </button>
          </div>

        </div>
      </header>

      {/* Main Content Body */}
      <main className="max-w-6xl mx-auto px-4 mt-8">
        
        {/* TAB 1: READING & TRANSLATION REVEALAR */}
        {activeTab === 'reading' && (
          <div>
            {/* Reading Modes Segments */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-1 max-w-full">
              <button
                id="r_dialog_tab"
                onClick={() => setReadingTab('dialog')}
                className={`px-4 py-2.5 rounded-xl font-bold text-xs md:text-sm shrink-0 flex items-center gap-2 border transition-all ${readingTab === 'dialog' ? 'bg-white text-indigo-600 border-indigo-200 shadow-md' : 'bg-slate-100 hover:bg-slate-200 text-slate-600 border-slate-200'}`}
              >
                <MessageSquare className="w-4 h-4" />
                Լուսիայի և Կառլոսի Դիալոգը
              </button>
              <button
                id="r_story_tab"
                onClick={() => setReadingTab('story')}
                className={`px-4 py-2.5 rounded-xl font-bold text-xs md:text-sm shrink-0 flex items-center gap-2 border transition-all ${readingTab === 'story' ? 'bg-white text-purple-600 border-purple-200 shadow-md' : 'bg-slate-100 hover:bg-slate-200 text-slate-600 border-slate-200'}`}
              >
                <BookOpen className="w-4 h-4" />
                Անայի Ճամփորդությունը
              </button>
              <button
                id="r_vocab_tab"
                onClick={() => setReadingTab('vocab')}
                className={`px-4 py-2.5 rounded-xl font-bold text-xs md:text-sm shrink-0 flex items-center gap-2 border transition-all ${readingTab === 'vocab' ? 'bg-white text-amber-600 border-amber-200 shadow-md' : 'bg-slate-100 hover:bg-slate-200 text-slate-600 border-slate-200'}`}
              >
                <Layers className="w-4 h-4" />
                Բառարանային Բայեր
              </button>
            </div>

            {/* Verb Tooltip Card */}
            {focusedVerb && (
              <div className="mb-6 p-4 bg-indigo-50 border-2 border-indigo-200 rounded-2xl flex items-start gap-3 relative animate-fade-in shadow-sm">
                <Sparkles className="w-5 h-5 text-indigo-500 mt-0.5 shrink-0" />
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-indigo-900 uppercase tracking-wide">Լեզվաբանական Փաստ</h4>
                  <p className="text-sm text-indigo-800 mt-1">
                    Իսպաներեն ապառնի ժամանակի <span className="font-bold underline text-indigo-600">{focusedVerb.es}</span> բայաձևը նշանակում է <span className="font-bold">«{focusedVerb.am}»</span>:
                  </p>
                  <p className="text-xs text-slate-600 mt-2">
                    Անորոշ դերբայը՝ <span className="font-bold text-slate-800 italic">{focusedVerb.base}</span> • Դերանունը՝ <span className="font-bold font-mono text-slate-800">{focusedVerb.pronoun}</span>
                  </p>
                </div>
                <button 
                  onClick={() => setFocusedVerb(null)}
                  className="p-1 text-slate-400 hover:text-slate-600 absolute top-2 right-2 bg-slate-200/50 hover:bg-slate-200 rounded-full transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* VIEW A: DIALOGUE */}
            {readingTab === 'dialog' && (
              <div className="glass bg-white py-6 px-5 md:p-8 shadow-xl">
                
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-dashed border-slate-200">
                  <div>
                    <h3 className="text-xl font-bold text-slate-950">Diálogo — Lucía y Carlos viajarán juntos</h3>
                    <p className="text-sm text-slate-600 mt-1">Լուսիան և Կառլոսը միասին կճանապարհորդեն: Սեղմի՛ր իսպաներեն <span className="font-semibold text-indigo-600 underline">նախադասությունների վրա</span>, որպեսզի ներքևում բացվի թարգմանությունը:</p>
                  </div>
                  <div className="flex flex-wrap gap-2 shrink-0">
                    <button 
                      onClick={() => {
                        const all: Record<string, boolean> = {};
                        dialogueLines.forEach(l => all[l.id] = true);
                        setDialogRevealed(all);
                      }}
                      className="px-3.5 py-1.5 text-xs font-bold bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-lg transition"
                    >
                      Բացել բոլորը
                    </button>
                    <button 
                      onClick={() => setDialogRevealed({})}
                      className="px-3.5 py-1.5 text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-lg transition"
                    >
                      Փակել բոլորը
                    </button>
                  </div>
                </div>

                {renderAmTip("Դիալոգում բոլոր ապառնի ժամանակով (Futuro Simple) խոնարհված բայերը նշված են վարդագույն պտուտակներով: Սեղմիր նրանց վրա՝ բայի անորոշ արմատը տեսնելու համար:")}

                <div className="flex flex-col gap-4 max-w-3xl mx-auto">
                  {dialogueLines.map((line) => {
                    const isRevealed = !!dialogRevealed[line.id];
                    const isLucia = line.speaker === 'Lucía';
                    
                    return (
                      <div 
                        key={line.id} 
                        className={`flex gap-3 items-start ${isLucia ? 'self-start w-[85%] md:w-[75%]' : 'self-end flex-row-reverse w-[85%] md:w-[75%]'}`}
                      >
                        {/* Avatar */}
                        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-white shadow shadow-indigo-100 shrink-0 ${isLucia ? 'bg-gradient-to-br from-pink-400 to-rose-500' : 'bg-gradient-to-br from-blue-400 to-indigo-600'}`}>
                          {isLucia ? '👧' : '👦'}
                        </div>

                        {/* Speech card */}
                        <div className="flex-1">
                          <div className={`text-xs font-bold font-fredoka mb-1 ${isLucia ? 'text-rose-500' : 'text-indigo-600'}`}>
                            {line.speaker}
                          </div>
                          
                          <div 
                            onClick={() => setDialogRevealed(p => ({ ...p, [line.id]: !p[line.id] }))}
                            className={`p-4 rounded-3xl cursor-pointer hover:shadow-md transition-all duration-200 select-none border border-slate-100 ${isLucia ? 'bg-rose-50/50 hover:bg-rose-50 rounded-tl-none text-slate-900' : 'bg-indigo-50/50 hover:bg-indigo-50 rounded-tr-none text-slate-900'}`}
                          >
                            <p className="text-base md:text-lg font-medium tracking-wide">
                              {/* Highlight future simple verbs */}
                              {line.textEs.split(' ').map((word, wIdx) => {
                                const cleanWord = word.replace(/[¿?¡!.,]/g, '');
                                // Map dialogue verbs
                                const knownVerb = vocabularyItems.find(v => v.es.toLowerCase() === cleanWord.toLowerCase());
                                if (knownVerb) {
                                  return (
                                    <span 
                                      key={wIdx} 
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        showVerbInfo(cleanWord, knownVerb.am, cleanWord, 'Futuro Simple');
                                      }}
                                      className="inline-block mx-0.5 px-1.5 py-0.5 bg-rose-200/50 hover:bg-rose-300/80 text-rose-800 font-bold rounded-lg transition-colors border-b-2 border-rose-400 cursor-help"
                                    >
                                      {word}
                                    </span>
                                  );
                                }
                                return <span key={wIdx}>{word} </span>;
                              })}
                            </p>

                            {/* Click invitation */}
                            <div className="mt-2 text-[11px] text-slate-400 flex items-center gap-1">
                              <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full inline-block" />
                              {isRevealed ? 'Թարգմանությունը բացված է:' : '👉 Սեղմիր՝ հայերեն թարգմանությունը տեսնելու համար'}
                            </div>

                            {/* Armenian Reveal Segment */}
                            <AnimatePresence>
                              {isRevealed && (
                                <motion.div 
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                  className="mt-3 pt-3 border-t border-slate-200/60 overflow-hidden"
                                >
                                  <p className="text-sm md:text-base font-bold text-indigo-900 bg-amber-200/40 p-2.5 rounded-xl border-l-4 border-amber-400">
                                    {line.textAm}
                                  </p>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

              </div>
            )}

            {/* VIEW B: UN VIAJE ESPECIAL */}
            {readingTab === 'story' && (
              <div className="glass bg-white py-6 px-5 md:p-8 shadow-xl">
                
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-dashed border-slate-200">
                  <div>
                    <h3 className="text-xl font-bold text-slate-950">Texto para leer — Un viaje especial</h3>
                    <p className="text-sm text-slate-600 mt-1">Անայի ճամփորդությունը հաջորդ ամառ: Սեղմիր յուրաքանչյուր նախադասության վրա, որպեսզի տեսնես նրա հայերեն թարգմանությունը:</p>
                  </div>
                  <div className="flex flex-wrap gap-2 shrink-0">
                    <button 
                      onClick={() => {
                        const all: Record<string, boolean> = {};
                        readingSentences.forEach(s => all[s.id] = true);
                        setStoryRevealed(all);
                      }}
                      className="px-3.5 py-1.5 text-xs font-bold bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-lg transition"
                    >
                      Բացել բոլորը
                    </button>
                    <button 
                      onClick={() => setStoryRevealed({})}
                      className="px-3.5 py-1.5 text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-lg transition"
                    >
                      Փակել բոլորը
                    </button>
                  </div>
                </div>

                {renderAmTip("Տեքստում բոլոր ապառնի ժամանակի բայերն ընդգծված են կանաչով։ Սեղմիր նրանց վրա՝ բացահայտելու համար բայերի հիմքն ու հայերեն թարգմանությունը:")}

                <div className="max-w-3xl mx-auto space-y-4">
                  {readingSentences.map((s, idx) => {
                    const isRevealed = !!storyRevealed[s.id];
                    return (
                      <div 
                        key={s.id}
                        className="sentence-card bg-white border border-slate-200/60 rounded-2xl p-4 transition-all shadow-sm"
                      >
                        <div 
                          onClick={() => setStoryRevealed(p => ({ ...p, [s.id]: !p[s.id] }))}
                          className="cursor-pointer font-medium text-slate-900 text-base md:text-lg select-none leading-relaxed"
                        >
                          <span className="inline-block text-xs font-mono font-bold bg-slate-200 text-slate-600 px-2 py-0.5 rounded mr-2.5">
                            {idx + 1}
                          </span>
                          
                          {/* Splt sentence word by word to highlight future verbs */}
                          {s.textEs.split(' ').map((word, wIdx) => {
                            const cleanWord = word.replace(/[¿?¡!.,]/g, '');
                            const knownVerb = textVerbs.find(v => v.es.toLowerCase() === cleanWord.toLowerCase());
                            if (knownVerb) {
                              return (
                                <span 
                                  key={wIdx} 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    showVerbInfo(cleanWord, knownVerb.am, cleanWord, 'Futuro Simple (3-րդ դեմք)');
                                  }}
                                  className="inline-block mx-0.5 px-1.5 py-0.5 bg-emerald-100/80 hover:bg-emerald-200 text-emerald-800 font-bold rounded-lg transition-colors border-b-2 border-emerald-400 cursor-help"
                                >
                                  {word}
                                </span>
                              );
                            }
                            return <span key={wIdx}>{word} </span>;
                          })}
                        </div>

                        <AnimatePresence>
                          {isRevealed && (
                            <motion.div 
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="mt-3 pt-3 border-t border-indigo-100 overflow-hidden"
                            >
                              <p className="text-sm md:text-base font-bold text-slate-800 bg-white p-3 rounded-xl border-l-4 border-emerald-500 shadow-sm leading-relaxed">
                                {s.textAm}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>

              </div>
            )}

            {/* VIEW C: VOCABULARY */}
            {readingTab === 'vocab' && (
              <div className="glass bg-white py-6 px-5 md:p-8 shadow-xl">
                <h3 className="text-xl font-bold text-slate-950 mb-2">Բառարանային Բայեր (Futuro Simple)</h3>
                <p className="text-sm text-slate-600 mb-6">Ապառնի ժամանակի հիմնական բայերն ու իրենց հայերեն թարգմանությունները։</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
                  {[...vocabularyItems, ...textVerbs].map((item, idx) => (
                    <div 
                      key={idx} 
                      className="game-card bg-gradient-to-br from-indigo-50/40 to-slate-100 border border-slate-200/50 rounded-2xl p-4 flex items-center justify-between shadow-sm cursor-pointer"
                    >
                      <div>
                        <div className="text-indigo-600 font-black tracking-wide text-base md:text-lg">
                          {item.es}
                        </div>
                        <div className="text-sm text-slate-700 font-medium mt-1">
                          {item.am}
                        </div>
                      </div>
                      <div className="p-2 bg-white rounded-xl shadow-xs">
                        <Smile className="w-5 h-5 text-indigo-400" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

        {/* TAB 2: INTERACTIVE GAMES (5 GAMES FOR KIDS) */}
        {activeTab === 'games' && (
          <div>
            {activeGame === null ? (
              // GRID OVERVIEW OF ALL GAMES
              <div>
                <div className="text-center mb-10 max-w-2xl mx-auto">
                  <h3 className="text-2xl md:text-3xl font-extrabold text-slate-950 font-fredoka">
                    Ինտերակտիվ Խաղախցիկ 🎮
                  </h3>
                  <p className="text-sm md:text-base text-slate-600 mt-2">
                    Բարի՜ գալուստ խաղատուն: Ընտրի՛ր 5 խաղերից մեկը, սովորիր իսպաներեն ապառնի ժամանակը խաղալով և հավաքիր ոսկյա աստղեր:
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  
                  {/* GAME 1 CARD */}
                  <div className="game-card glass bg-white/95 rounded-3xl p-6 relative overflow-hidden flex flex-col group">
                    <div className="absolute top-0 right-0 p-3 bg-amber-600 text-white rounded-bl-3xl font-black text-sm">ԽԱՂ 1</div>
                    <div className="w-12 h-12 bg-amber-100 text-amber-500 rounded-2xl flex items-center justify-center font-bold text-xl mb-4 group-hover:scale-110 transition-transform">👑</div>
                    <h4 className="text-lg font-black text-slate-950 font-fredoka">Ո՞վ է ուզում դառնալ միլիոնատեր</h4>
                    <p className="text-xs text-slate-600 mt-2 flex-grow">
                      15-հարցանոց ինտելեկտուալ 3D խաղ երկու խաղացողով իսպաներեն ապառնի ժամանակի (Futuro Simple) մասին:
                    </p>
                    <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full">★ Աստղային Մրցանակ (3D)</span>
                      <button 
                        onClick={() => { setActiveGame(1); resetMilGame(); }}
                        className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-bold text-xs transition flex items-center gap-1 shadow-md shadow-amber-200"
                      >
                        Սկսել <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* GAME 2 CARD */}
                  <div className="game-card glass bg-white/95 rounded-3xl p-6 relative overflow-hidden flex flex-col group">
                    <div className="absolute top-0 right-0 p-3 bg-pink-500 text-white rounded-bl-3xl font-black text-sm">ԽԱՂ 2</div>
                    <div className="w-12 h-12 bg-pink-100 text-pink-600 rounded-2xl flex items-center justify-center font-bold text-xl mb-4 group-hover:scale-110 transition-transform">🎈</div>
                    <h4 className="text-lg font-black text-slate-950 font-fredoka">Փուչիկների Խաղ</h4>
                    <p className="text-xs text-slate-600 mt-2 flex-grow">
                      Պայթեցրու այն փուչիկները, որոնք պարունակում են ճիշտ խոնարհված իսպաներեն ապառնի բայերը:
                    </p>
                    <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs font-bold text-pink-600 bg-pink-50 px-2.5 py-1 rounded-full">★ +40 միավոր</span>
                      <button 
                        onClick={() => setActiveGame(2)}
                        className="px-4 py-2 bg-pink-600 text-white rounded-xl font-bold text-xs hover:bg-pink-700 transition flex items-center gap-1"
                      >
                        Սկսել <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* GAME 3 CARD */}
                  <div className="game-card glass bg-white/95 rounded-3xl p-6 relative overflow-hidden flex flex-col group">
                    <div className="absolute top-0 right-0 p-3 bg-emerald-500 text-white rounded-bl-3xl font-black text-sm">ԽԱՂ 3</div>
                    <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center font-bold text-xl mb-4 group-hover:scale-110 transition-transform">🔓</div>
                    <h4 className="text-lg font-black text-slate-950 font-fredoka">Գանձերի Սնդուկ</h4>
                    <p className="text-xs text-slate-600 mt-2 flex-grow">
                      Դասակարգիր բայերը Կանոնավոր (Regulares) և Անկանոն (Irregulares) սնդուկների մեջ՝ գանձերը բացելու համար:
                    </p>
                    <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs font-bold text-emerald-600 bg-emerald-5px px-2.5 py-1 rounded-full">★ +45 միավոր</span>
                      <button 
                        onClick={() => { setActiveGame(3); resetG3Game(); }}
                        className="px-4 py-2 bg-emerald-600 text-white rounded-xl font-bold text-xs hover:bg-emerald-700 transition flex items-center gap-1"
                      >
                        Սկսել <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* GAME 4 CARD */}
                  <div className="game-card glass bg-white/95 rounded-3xl p-6 relative overflow-hidden flex flex-col group">
                    <div className="absolute top-0 right-0 p-3 bg-amber-500 text-white rounded-bl-3xl font-black text-sm">ԽԱՂ 4</div>
                    <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center font-bold text-xl mb-4 group-hover:scale-110 transition-transform">🕵️‍♂️</div>
                    <h4 className="text-lg font-black text-slate-950 font-fredoka">Բառերի Դետեկտիվ</h4>
                    <p className="text-xs text-slate-600 mt-2 flex-grow">
                      Դասավորիր իսպաներեն բառաշարքերը ճիշտ հերթականությամբ՝ ապառնի նախադասությունները թարգմանելու համար:
                    </p>
                    <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full">★ +50 միավոր</span>
                      <button 
                        onClick={() => { setActiveGame(4); resetG4Game(); }}
                        className="px-4 py-2 bg-amber-600 text-white rounded-xl font-bold text-xs hover:bg-amber-700 transition flex items-center gap-1"
                      >
                        Սկսել <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* GAME 5 CARD */}
                  <div className="game-card glass bg-white/95 rounded-3xl p-6 relative overflow-hidden flex flex-col group">
                    <div className="absolute top-0 right-0 p-3 bg-purple-500 text-white rounded-bl-3xl font-black text-sm">ԽԱՂ 5</div>
                    <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center font-bold text-xl mb-4 group-hover:scale-110 transition-transform">🃏</div>
                    <h4 className="text-lg font-black text-slate-950 font-fredoka">Մտապահման Քարտեր</h4>
                    <p className="text-xs text-slate-600 mt-2 flex-grow">
                      Գտիր զույգերը. Համապատասխանեցրու իսպաներեն ապառնի բայերը իրենց հայերեն թարգմանությունների հետ:
                    </p>
                    <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs font-bold text-purple-600 bg-purple-50 px-2.5 py-1 rounded-full">★ +40 միավոր</span>
                      <button 
                        onClick={() => setActiveGame(5)}
                        className="px-4 py-2 bg-purple-600 text-white rounded-xl font-bold text-xs hover:bg-purple-700 transition flex items-center gap-1"
                      >
                        Սկսել <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            ) : (
              // ACTIVE INDIVIDUAL GAME LAYOUT
              <div className="bg-white rounded-3xl border border-slate-100 p-5 md:p-8 shadow-md">
                
                {/* Game header with back arrow */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200/60">
                  <button 
                    onClick={() => setActiveGame(null)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-xl font-bold text-xs md:text-sm transition"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Դեպի Խաղերը
                  </button>
                  <div className="text-xs bg-slate-100 px-3 py-1 rounded-lg text-slate-600 font-bold flex items-center gap-1">
                    <Activity className="w-3.5 h-3.5 text-indigo-500 animate-pulse" />
                    Ձեր կենդանի միավորները՝ {score}★
                  </div>
                </div>

                {/* GAME 1: WHO WANTS TO BE A MILLIONAIRE - 15 QUESTIONS, 2 PLAYERS PROGRESSIVE 3D GAME */}
                {activeGame === 1 && (
                  <div className="font-sans text-slate-800">
                    <h3 className="text-xl md:text-2xl font-black text-slate-950 font-fredoka flex items-center gap-2">
                      👑 Ո՞վ է ուզում դառնալ միլիոնատեր (Futuro Simple 3D Special)
                    </h3>
                    
                    {/* Game LOBBY state */}
                    {milState === 'lobby' && (
                      <div className="mt-6 text-center bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-950 rounded-3xl p-6 md:p-10 text-white shadow-2xl relative overflow-hidden">
                        {/* 3D-like floating items */}
                        <div className="absolute -top-10 -left-10 w-40 h-40 bg-pink-500/10 rounded-full blur-2xl pointer-events-none" />
                        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
                        
                        <div className="max-w-xl mx-auto z-10 relative">
                          <div className="inline-block bg-amber-500/20 text-amber-300 font-extrabold text-xs px-4 py-1.5 rounded-full border border-amber-500/30 tracking-widest uppercase mb-4 animate-pulse">
                            🆕 ԵՐԿՈՒ ԽԱՂԱՑՈՂԻ ՌԵԺԻՄ (2 Players Mode)
                          </div>
                          
                          <div className="text-6xl mb-6 select-none filter drop-shadow-[0_10px_10px_rgba(251,191,36,0.3)] animate-spin-slow inline-block">👑</div>
                          
                          <h4 className="text-2xl md:text-3xl font-black tracking-wide text-amber-400 mb-4 uppercase drop-shadow">
                            ՄԻԼԻՈՆԱՏԵՐ 3D • FUTURO SIMPLE
                          </h4>
                          
                          <div className="p-4 bg-white/5 rounded-2xl border border-white/10 text-slate-200 text-sm leading-relaxed space-y-3 mb-6 text-left">
                            <p className="flex items-start gap-2">
                              <span className="text-amber-400 font-extrabold text-base">1.</span>
                              <span><strong>2 Խաղացողների մրցակցություն։</strong> Սկզբում խաղում է Խաղացող 1-ը, իսկ հետո՝ Խաղացող 2-ը։</span>
                            </p>
                            <p className="flex items-start gap-2">
                              <span className="text-amber-400 font-extrabold text-base">2.</span>
                              <span><strong>5 րոպե ժամանակ։</strong> Յուրաքանչյուր խաղացող ունի 300 վայրկյան՝ որքան հնարավոր է շատ հարցերի պատասխանելու համար (առավելագույնը 15 հարց):</span>
                            </p>
                            <p className="flex items-start gap-2">
                              <span className="text-amber-400 font-extrabold text-base">3.</span>
                              <span><strong>Մեկ Սխալ և Խաղն Ավարտվում է։</strong> Յուրաքանչյուր սխալ պատասխան անմիջապես ավարտում է տվյալ խաղացողի հերթը։</span>
                            </p>
                          </div>
                          
                          <button
                            onClick={startMilGame}
                            className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-900 font-black px-10 py-4 rounded-2xl shadow-xl hover:shadow-yellow-500/20 transform transition hover:scale-105 active:scale-98 cursor-pointer text-lg tracking-wide border-b-4 border-amber-700 active:border-b-0"
                          >
                            ՍԿՍԵԼ ՄՐՑՈՒՅԹԸ 🚀
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Game ACTIVE PLAYING state */}
                    {milState === 'playing' && (
                      <div className="mt-6 flex flex-col lg:flex-row gap-6 items-start">
                        
                        {/* 3D PERSPECTIVE LADDER COLUMN (LEFT) */}
                        <div 
                          className="w-full lg:w-72 bg-indigo-950/95 border border-indigo-900/60 p-4 md:p-5 rounded-3xl text-white shadow-xl flex flex-col flex-shrink-0 animate-fade-in animate-once duration-300"
                          style={{ 
                            transform: 'perspective(1000px) rotateY(-8deg) rotateX(10deg)', 
                            boxShadow: '0 20px 40px -15px rgba(30,27,75,0.4)' 
                          }}
                        >
                          <div className="text-center pb-3 border-b border-indigo-900">
                            <span className="text-[10px] text-amber-400 font-black tracking-widest uppercase block mb-1">
                              Մրցանակային Սանդղակ (3D)
                            </span>
                            <div className="text-sm font-bold text-slate-200">
                              Ընթացքը՝ {milCurrentQ + 1} / 15
                            </div>
                          </div>

                          {/* Ladder steps items rendered in reverse */}
                          <div className="flex flex-col gap-1 mt-3">
                            {Array.from({ length: 15 }).map((_, rIdx) => {
                              const qIdx = 14 - rIdx; // match indices 14 down to 0
                              const isCompleted = milCurrentQ > qIdx;
                              const isActive = milCurrentQ === qIdx;
                              const isMilestone = qIdx === 4 || qIdx === 9 || qIdx === 14;
                              const stepMultiplier = [
                                "100 ֏", "200 ֏", "300 ֏", "500 ֏", "1,000 ֏",
                                "2,000 ֏", "4,000 ֏", "8,000 ֏", "16,000 ֏", "32,000 ֏",
                                "64,000 ֏", "125,000 ֏", "250,000 ֏", "500,000 ֏", "1,000,000 ֏"
                              ];
                              const prize = stepMultiplier[qIdx];

                              const bgClass = isActive 
                                ? 'bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-black shadow-[0_0_15px_rgba(245,158,11,0.6)] scale-102 ring-1 ring-amber-300 animate-pulse'
                                : isCompleted 
                                  ? 'bg-slate-800/40 text-slate-500 border border-slate-800/40 opacity-50 font-normal line-through'
                                  : isMilestone 
                                    ? 'bg-indigo-900 border border-indigo-700 text-amber-300 font-bold'
                                    : 'bg-indigo-950/40 border border-indigo-900/40 text-indigo-300 font-medium hover:bg-indigo-900/30';

                              return (
                                <div 
                                  key={qIdx}
                                  className={`px-3 py-1 md:py-1.5 rounded-xl flex items-center justify-between text-xs transition duration-150 ${bgClass}`}
                                >
                                  <div className="flex items-center gap-1.5 font-mono">
                                    <span className={isActive ? 'text-slate-900' : isMilestone ? 'text-amber-300' : 'text-slate-400'}>
                                      {qIdx + 1}.
                                    </span>
                                    <span>{isActive ? '👉' : isCompleted ? '✅' : '🔹'}</span>
                                  </div>
                                  <div className="font-bold tracking-wide font-mono">
                                    {prize}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* QUESTION & BEVEL ANSWERS BOARD (RIGHT) */}
                        <div className="flex-1 w-full flex flex-col gap-5">
                          
                          {/* Active Player Card & Timer row */}
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50 border border-slate-200 rounded-2xl p-4 shadow-sm animate-fade-in">
                            <div className="flex items-center gap-3">
                              <div className={`w-3.5 h-3.5 rounded-full animate-ping ${milPlayer === 1 ? 'bg-indigo-600' : 'bg-purple-600'}`} />
                              <div className="font-black text-slate-900 font-fredoka text-sm uppercase">
                                {milPlayer === 1 ? (
                                  <span className="text-indigo-700">👤 Խաղացող 1-ի հերթն է</span>
                                ) : (
                                  <span className="text-purple-700">🎨 Խաղացող 2-ի հերթն է</span>
                                )}
                              </div>
                            </div>
                            
                            {/* Minutes countdown timer */}
                            <div className="flex items-center gap-2">
                              <div className={`px-4 py-1.5 rounded-full font-mono font-black text-sm border flex items-center gap-1.5 ${milTimer <= 60 ? 'bg-red-50 text-red-600 border-red-200 animate-pulse' : 'bg-amber-50 text-amber-800 border-amber-200'}`}>
                                <span className="text-base">⏳</span>
                                <span>
                                  {Math.floor(milTimer / 60)}:{(milTimer % 60).toString().padStart(2, '0')}
                                </span>
                              </div>
                              <span className="text-xs text-slate-500 font-medium">մնացել է</span>
                            </div>
                          </div>

                          {/* Beveled widescreen active question screen */}
                          <div className="bg-gradient-to-br from-indigo-900 to-indigo-950 text-white rounded-3xl p-6 md:p-8 text-center border-4 border-indigo-950 relative overflow-hidden shadow-lg shadow-indigo-950/20 animate-fade-in">
                            
                            <div className="absolute top-0 right-0 p-3 bg-indigo-950/70 border-b border-l border-white/11 rounded-bl-3xl">
                              <span className="text-xs text-indigo-300 font-mono font-black uppercase tracking-widest">
                                {milPlayer === 1 ? 'Player 1' : 'Player 2'}
                              </span>
                            </div>

                            <span className="text-xs font-black bg-indigo-950 text-amber-400 px-3 py-1 rounded-full border border-indigo-800 uppercase tracking-widest">
                              ՀԱՐՑ {milCurrentQ + 1}
                            </span>

                            <h2 className="text-xl md:text-2xl font-extrabold text-white mt-5 leading-relaxed tracking-wide font-mono font-fredoka">
                              {millionaireQuestions[milCurrentQ].question}
                            </h2>

                            <p className="text-slate-300 text-sm italic font-medium mt-3 bg-indigo-950/50 py-2.5 px-4 rounded-xl inline-block border border-indigo-950">
                              💡 Հուշում՝ {millionaireQuestions[milCurrentQ].contextAm}
                            </p>
                          </div>

                          {/* Answers grid using fully 3D pushable tactile option keys */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {millionaireQuestions[milCurrentQ].options.map((option, idx) => {
                              const prefixLetters = ['A', 'B', 'C', 'D'];
                              const isSelected = milSelectedOption === option;
                              
                              // Visual options coloring based on check
                              let btnClass = "bg-white text-slate-800 border-slate-200 hover:border-indigo-300 hover:bg-slate-50 shadow-md transform hover:-translate-y-0.5 active:translate-y-1 active:border-b-0";
                              let letterBg = "bg-indigo-100 text-indigo-700";
                              
                              if (milAnswerChecked) {
                                const correctAns = millionaireQuestions[milCurrentQ].correctAnswer;
                                const isCorrectThisOption = option === correctAns;
                                
                                if (isCorrectThisOption) {
                                  // Right answer option
                                  btnClass = "bg-gradient-to-r from-emerald-500 to-green-600 text-white border-green-700 animate-pulse shadow-md";
                                  letterBg = "bg-white/20 text-white font-black";
                                } else if (isSelected) {
                                  // Wrong chosen option
                                  btnClass = "bg-gradient-to-r from-red-500 to-rose-600 text-white border-rose-700 shadow-md";
                                  letterBg = "bg-white/20 text-white font-black";
                                } else {
                                  // Not selected and not correct
                                  btnClass = "bg-white text-slate-400 border-slate-100 opacity-60";
                                  letterBg = "bg-slate-100 text-slate-400";
                                }
                              } else if (isSelected) {
                                btnClass = "bg-indigo-50 border-indigo-500 text-indigo-900 border-b-2 shadow-inner scale-99";
                                letterBg = "bg-indigo-600 text-white font-black";
                              }

                              return (
                                <button
                                  key={idx}
                                  disabled={milAnswerChecked}
                                  onClick={() => handleMilAnswer(option)}
                                  className={`p-4 rounded-2xl border-2 text-left font-bold transition-all duration-150 flex items-center gap-4 cursor-pointer relative overflow-hidden border-b-4 ${btnClass}`}
                                >
                                  <span className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-sm shrink-0 shadow-inner ${letterBg}`}>
                                    {prefixLetters[idx]}
                                  </span>
                                  <span className="font-mono text-base tracking-wide flex-grow select-none">
                                    {option}
                                  </span>
                                  
                                  {milAnswerChecked && option === millionaireQuestions[milCurrentQ].correctAnswer && (
                                    <span className="text-xl shrink-0">✅</span>
                                  )}
                                  {milAnswerChecked && isSelected && option !== millionaireQuestions[milCurrentQ].correctAnswer && (
                                    <span className="text-xl shrink-0">❌</span>
                                  )}
                                </button>
                              );
                            })}
                          </div>

                          {/* Control row for playing */}
                          {milAnswerChecked && (
                            <div className="mt-4 p-4 bg-slate-50 border border-slate-200 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4 animate-fade-in shadow-inner">
                              <div>
                                <h5 className={`font-black text-sm sm:text-base ${milIsCorrect ? 'text-green-600' : 'text-red-700 d-inline-flex gap-1.5'}`}>
                                  {milIsCorrect ? '🎉 ՃԻՇՏ Է։ Փայլուն պատասխան է։' : '😢 ՈՒՓՍ։ Սխալ պատասխան է։'}
                                </h5>
                                <p className="text-xs text-slate-500 mt-1">
                                  Ճիշտ պատասխանը՝ <strong className="font-mono text-slate-800">{millionaireQuestions[milCurrentQ].correctAnswer}</strong>
                                </p>
                              </div>

                              <button
                                onClick={handleMilNext}
                                className={`px-6 py-3 rounded-2xl font-black text-sm text-white shrink-0 shadow-md ${milIsCorrect ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-red-600 hover:bg-red-700'} transition flex items-center gap-1 border-b-4 ${milIsCorrect ? 'border-indigo-800' : 'border-red-800'} active:border-b-0 active:translate-y-1`}
                              >
                                {(!milIsCorrect || milCurrentQ === 14) ? (
                                  <>Ավարտել Հերթը <ChevronRight className="w-4 h-4" /></>
                                ) : (
                                  <>Հաջորդ հարցը <ChevronRight className="w-4 h-4" /></>
                                )}
                              </button>
                            </div>
                          )}

                        </div>

                      </div>
                    )}

                    {/* LOBBY Transition after Player 1 finish */}
                    {milState === 'p1_finished' && (
                      <div className="mt-6 text-center bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-950 rounded-3xl p-6 md:p-10 text-white shadow-2xl relative overflow-hidden">
                        <div className="max-w-xl mx-auto z-10 relative">
                          <span className="text-xs uppercase bg-emerald-500/20 text-emerald-300 font-extrabold px-3 py-1 rounded-full border border-emerald-500/30 animate-pulse">
                            👤 Խաղացող 1-ի հերթն ավարտվեց
                          </span>
                          
                          <div className="text-6xl my-6">🏆</div>
                          
                          <h4 className="text-2xl md:text-3xl font-black tracking-wide text-amber-300 mb-6 uppercase">
                            ԽԱՂԱՑՈՂ 1-Ի ԱՐԴՅՈՒՆՔՆԵՐԸ
                          </h4>
                          
                          <div className="p-4 bg-white/5 border border-white/10 rounded-2xl text-slate-200 space-y-2 max-w-sm mx-auto mb-8 text-left font-mono">
                            <div className="flex justify-between">
                              <span>Ճիշտ պատասխաններ՝</span>
                              <strong className="text-amber-400 font-black">{milP1Score} / 15</strong>
                            </div>
                            <div className="flex justify-between">
                              <span>Ծախսված ժամանակ՝</span>
                              <strong className="text-slate-300">{milP1TimeSpent} վայրկյան</strong>
                            </div>
                            <div className="flex justify-between">
                              <span>Հավաքած գումար/փուլ՝</span>
                              <strong className="text-green-400 animate-pulse">
                                {milP1Score === 0 ? "0 ֏" : [
                                  "100 ֏", "200 ֏", "300 ֏", "500 ֏", "1,000 ֏",
                                  "2,000 ֏", "4,000 ֏", "8,000 ֏", "16,000 ֏", "32,000 ֏",
                                  "64,000 ֏", "125,000 ֏", "250,000 ֏", "500,000 ֏", "1,000,000 ֏"
                                ][milP1Score - 1]}
                              </strong>
                            </div>
                          </div>

                          <div className="p-4 bg-indigo-900/40 border border-indigo-800/40 text-sm text-indigo-200 italic mb-8 max-w-md mx-auto rounded-xl">
                            « Պատրաստվե՛ք... Այժմ Խաղացող 2-ի հերթն է: Պարամետրերը կթարմացվեն և նոր 300 վայրկյան կտրվի: »
                          </div>

                          <button
                            onClick={startMilPlayer2}
                            className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-black px-10 py-4 rounded-2xl shadow-xl transform transition hover:scale-105 active:scale-98 cursor-pointer text-lg tracking-wide border-b-4 border-green-800 active:border-b-0"
                          >
                            ՍԿՍԵԼ ԽԱՂԱՑՈՂ 2-Ի ՀԵՐԹԸ 🎨
                          </button>
                        </div>
                      </div>
                    )}

                    {/* GAME OVER LEADERBOARD WITH 3D PILLARS */}
                    {milState === 'game_over' && (
                      <div className="mt-6 text-center bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-950 rounded-3xl p-6 md:p-10 text-white shadow-2xl relative overflow-hidden">
                        <div className="max-w-2xl mx-auto z-10 relative">
                          <span className="text-xs uppercase bg-amber-500/20 text-amber-300 font-extrabold px-3 py-1 rounded-full border border-amber-500/30">
                            🏁 ՄՐՑՈՒՅԹՆ ԱՎԱՐՏՎԱԾ Է
                          </span>

                          <h2 className="text-3xl md:text-4xl font-black text-amber-300 my-6 font-fredoka uppercase tracking-wider">
                            {milP1Score === milP2Score ? (
                              "🤝 ՈՉ-ՈՔ / ՈՉ-ՈՔ (DRAW)"
                            ) : milP1Score > milP2Score ? (
                              "🏆 ՀԱՂԹԵՑ ԽԱՂԱՑՈՂ 1-Ը"
                            ) : (
                              "🏆 ՀԱՂԹԵՑ ԽԱՂԱՑՈՂ 2-Ը"
                            )}
                          </h2>

                          {/* 3D Pillars representation chart */}
                          <div className="flex items-end justify-center gap-12 my-12 h-64 md:h-72 border-b border-indigo-900 pb-1 flex-wrap select-none md:flex-nowrap">
                            
                            {/* Player 1 Pillar */}
                            <div className="flex flex-col items-center w-28 md:w-36">
                              <span className="text-xs font-mono font-bold text-slate-300 block mb-2">
                                {milP1Score} / 15 ճիշտ
                              </span>
                              <motion.div 
                                initial={{ height: 0 }}
                                animate={{ height: `${(milP1Score / 15) * 160 + 20}px` }}
                                transition={{ type: "spring", damping: 12 }}
                                className="w-full bg-gradient-to-t from-indigo-900 to-indigo-500 border border-indigo-400 rounded-t-2xl shadow-[5px_-5px_15px_rgba(99,102,241,0.2)] flex flex-col justify-between p-3 relative overflow-hidden"
                                style={{ transform: 'perspective(400px) rotateX(15deg) rotateY(15deg)' }}
                              >
                                <div className="absolute inset-0 bg-white/5 skew-y-6 transform origin-top-left" />
                                <span className="font-extrabold text-sm text-indigo-100 z-10 block">P1</span>
                                <span className="font-bold text-xs text-amber-300 font-mono z-10 block mb-1">
                                  {milP1Score === 0 ? "0 ֏" : [
                                    "100 ֏", "200 ֏", "300 ֏", "500 ֏", "1,000 ֏",
                                    "2,000 ֏", "4,000 ֏", "8,000 ֏", "16,000 ֏", "32,000 ֏",
                                    "64,000 ֏", "125,000 ֏", "250,000 ֏", "500,000 ֏", "1,000,000 ֏"
                                  ][milP1Score - 1]}
                                </span>
                              </motion.div>
                              <span className="text-sm font-black text-slate-200 mt-3 font-fredoka flex items-center gap-1">
                                👤 Խաղացող 1
                              </span>
                              <span className="text-[10px] text-slate-400 font-mono block mt-0.5">
                                {milP1TimeSpent} վրկ
                              </span>
                            </div>

                            {/* Player 2 Pillar */}
                            <div className="flex flex-col items-center w-28 md:w-36">
                              <span className="text-xs font-mono font-bold text-slate-300 block mb-2">
                                {milP2Score} / 15 ճիշտ
                              </span>
                              <motion.div 
                                initial={{ height: 0 }}
                                animate={{ height: `${(milP2Score / 15) * 160 + 20}px` }}
                                transition={{ type: "spring", damping: 12, delay: 0.1 }}
                                className="w-full bg-gradient-to-t from-purple-900 to-purple-500 border border-purple-400 rounded-t-2xl shadow-[5px_-5px_15px_rgba(168,85,247,0.2)] flex flex-col justify-between p-3 relative overflow-hidden"
                                style={{ transform: 'perspective(400px) rotateX(15deg) rotateY(-15deg)' }}
                              >
                                <div className="absolute inset-0 bg-white/5 skew-y-6 transform origin-top-left" />
                                <span className="font-extrabold text-sm text-purple-100 z-10 block">P2</span>
                                <span className="font-bold text-xs text-amber-300 font-mono z-10 block mb-1">
                                  {milP2Score === 0 ? "0 ֏" : [
                                    "100 ֏", "200 ֏", "300 ֏", "500 ֏", "1,000 ֏",
                                    "2,000 ֏", "4,000 ֏", "8,000 ֏", "16,000 ֏", "32,000 ֏",
                                    "64,000 ֏", "125,000 ֏", "250,000 ֏", "500,000 ֏", "1,000,000 ֏"
                                  ][milP2Score - 1]}
                                </span>
                              </motion.div>
                              <span className="text-sm font-black text-slate-200 mt-3 font-fredoka flex items-center gap-1">
                                🎨 Խաղացող 2
                              </span>
                              <span className="text-[10px] text-slate-400 font-mono block mt-0.5">
                                {milP2TimeSpent} վրկ
                              </span>
                            </div>

                          </div>

                          <div className="bg-slate-900/60 p-4 border border-indigo-900/50 text-sm rounded-2xl max-w-sm mx-auto mb-8 text-indigo-300 font-bold">
                            🌟 Խաղի ավարտի աստղային բոնուս՝ +{Math.max(milP1Score, milP2Score) * 10 + 50} ★
                          </div>

                          <button
                            onClick={resetMilGame}
                            className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-900 font-black px-10 py-4 rounded-2xl shadow-xl transform transition hover:scale-105 cursor-pointer text-lg tracking-wide border-b-4 border-amber-800 active:border-b-0 active:translate-y-1 inline-flex items-center gap-2"
                          >
                            <RotateCcw className="w-5 h-5" />
                            Խաղալ Կրկին
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Footer resets */}
                    {milState !== 'lobby' && (
                      <div className="flex justify-center mt-8 pt-4 border-t border-slate-100">
                        <button
                          onClick={resetMilGame}
                          className="flex items-center gap-1 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer"
                        >
                          <RotateCcw className="w-4 h-4" />
                          Վերասկսել ամբողջը
                        </button>
                      </div>
                    )}

                  </div>
                )}

                {/* GAME 2: BALLOON POP SUFFIX */}
                {activeGame === 2 && (
                  <div>
                    <h3 className="text-xl md:text-2xl font-black text-slate-950 font-fredoka flex items-center gap-2">
                      🎈 Փուչիկների Խաղ (Balloon Pop Game)
                    </h3>

                    {renderAmTip("Էկրանին տրված է դերանունը և բայը (օրինակ `Tú + comer (ուտել)`): Գտիր floating փուչիկներից այն մեկը, որը պարունակում է ճիշտ ապառնի խոնարհումը, և կտտացրու դրա վրա:")}

                    {!g2Finished ? (
                      <div>
                        {/* Target equation banner */}
                        <div className="bg-gradient-to-br from-pink-50 to-rose-50 border-2 border-pink-200/65 rounded-2xl p-6 text-center shadow-xs my-6">
                          <span className="text-xs font-bold uppercase tracking-widest text-pink-500 bg-white border border-pink-200 px-3 py-1 rounded-full">
                            Մակարդակ {g2Level + 1} / 5
                          </span>
                          <h2 className="text-2xl md:text-3xl font-black text-pink-900 mt-3 font-mono flex items-center justify-center gap-2">
                            {balloonLevels[g2Level].pronoun} + <span className="underline">{balloonLevels[g2Level].verb}</span>
                          </h2>
                          <p className="text-sm font-bold text-slate-600 mt-1">
                            (Իմաստը՝ {balloonLevels[g2Level].verbMeaning})
                          </p>
                        </div>

                        {/* Interactive Floating Balloons display context */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-8">
                          {balloonLevels[g2Level].options.map((option, idx) => {
                            const isSelected = g2SelectedOption === option;
                            const isCorrect = option === balloonLevels[g2Level].correctAnswer;
                            
                            // Visual classes for safe state retention
                            let stateClasses = bgGradientRotate(idx);
                            if (g2SelectedOption) {
                              if (isSelected) {
                                stateClasses = isCorrect 
                                  ? 'bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-green-200 font-extrabold' 
                                  : 'bg-gradient-to-br from-red-500 to-rose-600 text-white shadow-red-200 font-extrabold';
                              } else {
                                stateClasses = bgGradientRotate(idx) + ' opacity-30 scale-95';
                              }
                            }

                            return (
                              <motion.button
                                whileHover={{ scale: 1.05, y: -5 }}
                                whileTap={{ scale: 0.95 }}
                                key={idx}
                                disabled={!!g2SelectedOption}
                                onClick={() => handleG2Answer(option)}
                                className={`h-36 md:h-44 rounded-[3rem] p-4 flex flex-col justify-between items-center text-center shadow-lg transition-all duration-150 animate-float-bubble cursor-pointer border-2 border-white relative overflow-hidden ${stateClasses}`}
                              >
                                {/* String tag */}
                                <div className="absolute top-1 right-2 bg-white/20 px-2 py-0.5 rounded-full text-[10px] font-bold">🎈</div>
                                
                                <span className="font-extrabold text-base md:text-lg uppercase tracking-wide my-auto">
                                  {option}
                                </span>

                                <div className="w-[1.5px] h-6 bg-slate-300 shadow opacity-50 absolute bottom-0 left-1/2 -translate-x-1/2" />
                              </motion.button>
                            );
                          })}
                        </div>

                        {/* Next Level controls */}
                        {g2SelectedOption && (
                          <div className="mt-6 p-4 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 animate-fade-in">
                            <div>
                              <p className="text-sm md:text-base font-bold text-slate-800">
                                {g2IsCorrect ? (
                                  <span className="text-green-600 flex items-center gap-1">🎉 Ճիշտ է: Հրաշալի պատասխան է: (+15 միավոր)</span>
                                ) : (
                                  <span className="text-red-600 flex items-center gap-1">😢 Ուփս, սխալ է: </span>
                                )}
                              </p>
                              <p className="text-xs text-slate-500 mt-1">
                                {balloonLevels[g2Level].pronoun} + {balloonLevels[g2Level].verb} = <span className="underline font-bold font-mono">{balloonLevels[g2Level].correctAnswer}</span>
                              </p>
                            </div>
                            <button
                              onClick={nextG2Level}
                              className="px-6 py-2 bg-pink-600 hover:bg-pink-700 text-white font-bold rounded-xl text-sm transition flex items-center gap-1 shadow shadow-pink-200"
                            >
                              Հաջորդը <ChevronRight className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </div>
                    ) : (
                      // Trophy/Finish Segment
                      <div className="text-center py-10">
                        <Trophy className="w-16 h-16 text-amber-500 mx-auto animate-bounce" />
                        <h3 className="text-2xl font-black text-slate-900 mt-4 font-fredoka">
                          Շնորհավորո՛ւմ ենք:
                        </h3>
                        <p className="text-slate-600 mt-1 text-sm md:text-base max-w-md mx-auto">
                          Դուք հաջողությամբ պայթեցրեցիք բոլոր ճիշտ փուչիկները և լրացրեցիք 5 մակարդակները:
                        </p>
                        <div className="bg-slate-100 p-4 rounded-2xl max-w-xs mx-auto my-6 font-bold text-slate-600">
                          Հավելյալ ստացած միավորներ՝ +40 ★
                        </div>
                        <button
                          onClick={resetG2Game}
                          className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition"
                        >
                          Կրկին Խաղալ
                        </button>
                      </div>
                    )}

                  </div>
                )}

                {/* GAME 3: REGULAR VS IRREGULAR CHESTS */}
                {activeGame === 3 && (
                  <div>
                    <h3 className="text-xl md:text-2xl font-black text-slate-950 font-fredoka flex items-center gap-2">
                      🔓 Կանոնավոր թե Անկանոն բայեր
                    </h3>

                    {renderAmTip("Իսպաներենում ապառնի ժամանակը կազմելիս որոշ բայեր կանոնավոր են (պահպանում են infinitivo-ն), իսկ որոշները` անկանոն (փոխում են իրենց արմատը): Դասավորիր տրված բայաձևերը ճիշտ սնդուկների մեջ:")}

                    {!g3Finished ? (
                      <div>
                        {/* Word indicator card */}
                        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 text-center shadow-xs my-6 relative overflow-hidden">
                          <div className="text-xs font-bold text-indigo-500 uppercase tracking-widest bg-white border border-indigo-100 px-3 py-1 rounded-full inline-block">
                            Բայ {g3Index + 1} / 8
                          </div>
                          
                          <h2 className="text-3xl font-black text-slate-900 mt-4 tracking-wide font-mono select-all">
                            {classificationVerbs[g3Index].word}
                          </h2>
                          
                          <p className="text-sm font-bold text-slate-500 mt-2">
                            (Կազմված է՝ <span className="italic font-fredoka text-indigo-600">{classificationVerbs[g3Index].stem}</span>)
                          </p>
                        </div>

                        {/* Chests options columns */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                          
                          {/* Regular chest card */}
                          <button
                            disabled={!!g3Feedback}
                            onClick={() => handleG3Categorize('regular')}
                            className={`p-6 md:p-8 rounded-3xl border-2 text-center transition shadow-sm hover:shadow-lg flex flex-col items-center justify-between cursor-pointer group ${g3SelectedChest === 'regular' ? 'bg-emerald-50 border-emerald-500 scale-102 ring-2 ring-emerald-300' : 'bg-white border-slate-100 hover:border-emerald-300 text-slate-800'}`}
                          >
                            <div className="text-5xl group-hover:scale-110 transition-transform">🌲🏺</div>
                            <div className="mt-4">
                              <h4 className="text-lg font-black text-emerald-700 font-fredoka">Կանոնավոր (Regulares)</h4>
                              <p className="text-xs text-slate-500 mt-1">Բայը չի փոխում իր հիմնական անորոշ արմատը ապառնիում</p>
                            </div>
                          </button>

                          {/* Irregular chest card */}
                          <button
                            disabled={!!g3Feedback}
                            onClick={() => handleG3Categorize('irregular')}
                            className={`p-6 md:p-8 rounded-3xl border-2 text-center transition shadow-sm hover:shadow-lg flex flex-col items-center justify-between cursor-pointer group ${g3SelectedChest === 'irregular' ? 'bg-amber-50 border-amber-500 scale-102 ring-2 ring-amber-300' : 'bg-white border-slate-100 hover:border-amber-300 text-slate-800'}`}
                          >
                            <div className="text-5xl group-hover:scale-110 transition-transform">🪙💎</div>
                            <div className="mt-4">
                              <h4 className="text-lg font-black text-amber-700 font-fredoka">Անկանոն (Irregulares)</h4>
                              <p className="text-xs text-slate-500 mt-1">Բայը փոխում է իր անորոշ հիմքը ապառնիում (har-, tendr-)</p>
                            </div>
                          </button>

                        </div>

                        {/* Interactive explanations and feedback footer */}
                        {g3Feedback && (
                          <div className="mt-6 p-4 rounded-2xl border-2 bg-slate-50 border-slate-200 shadow-inner flex flex-col md:flex-row items-center justify-between gap-4 animate-fade-in">
                            <div className="text-center md:text-left">
                              <p className="text-sm md:text-base font-bold text-slate-900 leading-snug">
                                {g3Feedback.text}
                              </p>
                              <p className="text-xs text-slate-700 mt-2 font-mono bg-white p-2 rounded-lg border border-slate-200 inline-block">
                                {classificationVerbs[g3Index].explanationAm}
                              </p>
                            </div>
                            <button
                              onClick={nextG3Verb}
                              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs sm:text-sm shrink-0 transition"
                            >
                              Հաջորդ բայը
                            </button>
                          </div>
                        )}
                      </div>
                    ) : (
                      // Final scorecard
                      <div className="text-center py-10">
                        <Award className="w-16 h-16 text-emerald-500 mx-auto animate-bounce" />
                        <h3 className="text-2xl font-black text-slate-900 mt-4 font-fredoka">
                          Փայլո՛ւն է:
                        </h3>
                        <p className="text-slate-600 mt-1 text-sm md:text-base max-w-md mx-auto">
                          Դուք դասավորեցիք բոլոր 8 բայերը ճիշտ սնդուկների մեջ և բացեցիք գանձերը:
                        </p>
                        <div className="bg-slate-100 p-4 rounded-2xl max-w-xs mx-auto my-6 font-bold text-slate-600">
                          Հավելյալ ստացած միավորներ՝ +45 ★
                        </div>
                        <button
                          onClick={resetG3Game}
                          className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition"
                        >
                          Կրկին Խաղալ
                        </button>
                      </div>
                    )}

                  </div>
                )}

                {/* GAME 4: SENTENCE PUZZLE DETECTIVE */}
                {activeGame === 4 && (
                  <div>
                    <h3 className="text-xl md:text-2xl font-black text-slate-950 font-fredoka flex items-center gap-2">
                      🕵️‍♂️ Բառերի Դետեկտիվ (Sentence Detective)
                    </h3>

                    {renderAmTip("Օգնիր դետեկտիվին դասավորել իսպաներեն բառաշարքը ճիշտ հերթականությամբ, որպեսզի ստանաս տրված հայերեն ապառնի նախադասության ճիշտ թարգմանությունը:")}

                    {!g4Finished ? (
                      <div>
                        {/* Target Armenia Translation */}
                        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-5 my-6">
                          <span className="text-xs text-amber-700 font-bold bg-white border border-amber-200 px-2.5 py-0.5 rounded-md">
                            Առաջադրանք {g4Level + 1} / 4
                          </span>
                          <h4 className="text-lg font-bold text-slate-900 mt-2 font-fredoka">
                            "{sentencesPuzzles[g4Level].sentenceAm}"
                          </h4>
                        </div>

                        {/* Answer Workspace (Where selected word bubbles land) */}
                        <div className="min-h-[100px] bg-slate-100/50 border-2 border-dashed border-slate-300 rounded-3xl p-5 flex flex-wrap gap-2 items-center justify-center shadow-inner my-6">
                          {g4SelectedWords.length === 0 ? (
                            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                              Կպցրեք բառերը ներքևից՝ նախադասություն ստանալու համար:
                            </span>
                          ) : (
                            g4SelectedWords.map((word, wIdx) => (
                              <button
                                key={wIdx}
                                disabled={g4Checked}
                                onClick={() => handleG4WordClick(word, true)}
                                className={`px-4 py-2.5 bg-indigo-100 border border-indigo-200 text-indigo-900 rounded-xl font-bold font-mono text-sm md:text-base hover:bg-slate-200 cursor-pointer ${g4Checked ? 'opacity-80' : ''}`}
                              >
                                {word}
                              </button>
                            ))
                          )}
                        </div>

                        {/* Options Pool */}
                        <div className="my-6">
                          <h5 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center mb-3">
                            Ընտրեք բառերը (բառերի լողավազան)
                          </h5>
                          <div className="flex flex-wrap gap-2 justify-center">
                            {sentencesPuzzles[g4Level].wordsEs.map((word, idx) => {
                              const isSelected = g4SelectedWords.includes(word);
                              return (
                                <button
                                  key={idx}
                                  disabled={isSelected || g4Checked}
                                  onClick={() => handleG4WordClick(word, false)}
                                  className={`px-4 py-2.5 border rounded-xl font-bold font-mono text-sm md:text-base cursor-pointer hover:shadow transition-all ${isSelected ? 'bg-slate-100 border-slate-200 text-slate-300 pointer-events-none' : 'bg-white border-slate-300 text-slate-800'}`}
                                >
                                  {word}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Check Controls */}
                        <div className="flex items-center justify-between mt-8 pt-4 border-t border-slate-100">
                          <button
                            disabled={g4SelectedWords.length === 0 || g4Checked}
                            onClick={() => setG4SelectedWords([])}
                            className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1"
                          >
                            <RotateCcw className="w-4 h-4" />
                            Մաքրել
                          </button>
                          
                          {!g4Checked ? (
                            <button
                              disabled={g4SelectedWords.length === 0}
                              onClick={handleG4Check}
                              className="bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold px-6 py-2.5 rounded-xl text-xs sm:text-sm transition shadow shadow-indigo-200"
                            >
                              Ստուգել
                            </button>
                          ) : (
                            <button
                              onClick={nextG4Level}
                              className="bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold px-6 py-2.5 rounded-xl text-xs sm:text-sm transition flex items-center gap-1"
                            >
                              Հաջորդը <ChevronRight className="w-4 h-4" />
                            </button>
                          )}
                        </div>

                        {/* Correction Explanations and Spark feedback banner */}
                        {g4Checked && (
                          <div className="mt-6 p-4 rounded-xl border-2 bg-slate-50 border-slate-250 animate-fade-in text-center shadow-inner">
                            {g4IsCorrect ? (
                              <p className="text-green-600 font-extrabold text-base flex justify-center items-center gap-1.5">
                                <Check className="w-5 h-5" /> Ճիշտ է: Նախադասությունը կազմված է անթերի: (+20 միավոր)
                              </p>
                            ) : (
                              <div>
                                <p className="text-red-500 font-extrabold text-base flex justify-center items-center gap-1.5">
                                  <X className="w-5 h-5" /> Ոչ, սխալ հերթականություն է:
                                </p>
                                <p className="text-xs text-slate-600 mt-2 font-mono">
                                  Ճիշտ հերթականությունն է՝ **{sentencesPuzzles[g4Level].correctOrder.join(' ')}**
                                </p>
                              </div>
                            )}
                          </div>
                        )}

                      </div>
                    ) : (
                      // Final scorecard
                      <div className="text-center py-10">
                        <Trophy className="w-16 h-16 text-amber-500 mx-auto animate-bounce" />
                        <h3 className="text-2xl font-black text-slate-900 mt-4 font-fredoka">
                          Փայլուն աշխատանք:
                        </h3>
                        <p className="text-slate-600 mt-1 text-sm md:text-base max-w-md mx-auto">
                          Դուք ճիշտ դասավորեցիք բոլոր իսպաներեն ապառնի նախադասությունները, դետեկտիվ:
                        </p>
                        <div className="bg-slate-100 p-4 rounded-2xl max-w-xs mx-auto my-6 font-bold text-slate-600">
                          Հավելյալ ստացած միավորներ՝ +50 ★
                        </div>
                        <button
                          onClick={resetG4Game}
                          className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition"
                        >
                          Կրկին Խաղալ
                        </button>
                      </div>
                    )}

                  </div>
                )}

                {/* GAME 5: MEMORY CARDS MATCH */}
                {activeGame === 5 && (
                  <div>
                    <h3 className="text-xl md:text-2xl font-black text-slate-950 font-fredoka flex items-center gap-2">
                      🃏 Մտապահման Քարտեր (Memory Cards Match)
                    </h3>

                    {renderAmTip("Բացիր երկու քարտ և փորձիր գտնել իսպաներեն ապառնի բայի համապատասխան թարգմանությունը հայերենով: Գտիր բոլոր 6 զույգերը:")}

                    <div className="text-center text-xs text-slate-500 font-bold mb-4">
                      Կատարված քայլեր՝ <span className="text-indigo-600 text-sm font-black">{g5Moves}</span>
                    </div>

                    {!g5Finished ? (
                      <div className="grid grid-cols-3 md:grid-cols-4 gap-3 md:gap-4 max-w-2xl mx-auto my-6">
                        {g5Cards.map((card, idx) => {
                          const isShowing = card.isFlipped || card.isMatched;
                          return (
                            <div
                              key={card.id}
                              onClick={() => handleG5CardClick(idx)}
                              className={`h-28 md:h-32 rounded-2xl border-2 flex items-center justify-center p-3 text-center cursor-pointer select-none transition-all duration-300 relative ${card.isMatched ? 'bg-green-50/50 border-green-500 scale-95 opacity-80' : card.isFlipped ? 'bg-indigo-50 border-indigo-400 shadow-md' : 'bg-gradient-to-br from-indigo-500 to-purple-600 border-white shadow hover:scale-102 hover:shadow-lg'}`}
                            >
                              {isShowing ? (
                                <span className={`font-bold text-xs md:text-sm leading-snug break-words ${card.isMatched ? 'text-green-900' : 'text-indigo-900'}`}>
                                  {card.text}
                                </span>
                              ) : (
                                <span className="font-mono text-3xl text-white opacity-80 animate-pulse">
                                  ★
                                </span>
                              )}

                              {card.isMatched && (
                                <div className="absolute top-1 right-1.5 p-0.5 bg-green-500 text-white rounded-full text-[8px] font-black">✓</div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="text-center py-10">
                        <Crown className="w-16 h-16 text-purple-500 mx-auto animate-bounce" />
                        <h3 className="text-2xl font-black text-slate-900 mt-4 font-fredoka">
                          Հրաշալի՛ է:
                        </h3>
                        <p className="text-slate-600 mt-1 text-sm md:text-base max-w-md mx-auto">
                          Դուք գտաք բոլոր 6 զույգերը {g5Moves} քայլերի ընթացքում:
                        </p>
                        <div className="bg-slate-100 p-4 rounded-2xl max-w-xs mx-auto my-6 font-bold text-slate-600">
                          Հավելյալ ստացած միավորներ՝ +40 ★
                        </div>
                        <button
                          onClick={initG5Game}
                          className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition"
                        >
                          Կրկին Խաղալ
                        </button>
                      </div>
                    )}

                  </div>
                )}



              </div>
            )}
          </div>
        )}

        {/* TAB 3: THE GRAMMAR RULES TUTORIAL */}
        {activeTab === 'rules' && (
          <div className="glass bg-white py-6 px-5 md:p-8 shadow-xl max-w-4xl mx-auto-layout">
            
            <div className="text-center mb-8">
              <span className="text-xs font-bold uppercase tracking-widest bg-yellow-100 border border-yellow-200 px-3 py-1 rounded-full text-yellow-800">
                Gramática — Քերականություն
              </span>
              <h3 className="text-2xl md:text-3xl font-black text-slate-950 font-fredoka mt-3">
                Կանոններ` Futuro Simple 🇪🇸
              </h3>
              <p className="text-sm text-slate-600 mt-2">
                Սովորի՛ր, թե ինչպես է հեշտությամբ կազմվում ապառնի ժամանակը իսպաներենում:
              </p>
            </div>

            {/* Rule 1: Regular ending */}
            <div className="mt-6 border-b border-slate-200/80 pb-6">
              <h4 className="text-base md:text-lg font-black text-slate-900 font-fredoka flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-black">1</span>
                Կանոնավոր բայերի կազմությունը (Verbos Regulares)
              </h4>
              <p className="text-sm text-slate-700 mt-2 leading-relaxed">
                Ի տարբերություն իսպաներենի այլ ժամանակների, ապառնի ժամանակում (Futuro), կանոնավոր բայերի <span className="font-bold underline text-indigo-600">անորոշ դերբայը (Infinitive)</span> չի փոխվում: Մենք պարզապես վերցնում ենք ամբողջ բայը (օրինակ՝ <code className="bg-slate-100 px-1 py-0.5 font-bold rounded">viajar</code>, <code className="bg-slate-100 px-1 py-0.5 font-bold rounded">comer</code>, <code className="bg-slate-100 px-1 py-0.5 font-bold rounded">escribir</code>) և դրան ավելացնում ենք համապատասխան վերջավորությունը.
              </p>

              {/* Grid with suffixes */}
              <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mt-4">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/60 text-center">
                  <div className="text-[10px] font-bold text-slate-400">Yo (ես)</div>
                  <div className="text-lg font-mono font-black text-indigo-700 mt-1">-é</div>
                  <div className="text-[10px] italic text-slate-500 mt-0.5">viajaré</div>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/60 text-center">
                  <div className="text-[10px] font-bold text-slate-400">Tú (դու)</div>
                  <div className="text-lg font-mono font-black text-indigo-700 mt-1">-ás</div>
                  <div className="text-[10px] italic text-slate-500 mt-0.5">viajarás</div>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/60 text-center">
                  <div className="text-[10px] font-bold text-slate-400">Él/Ella (նա)</div>
                  <div className="text-lg font-mono font-black text-indigo-700 mt-1">-á</div>
                  <div className="text-[10px] italic text-slate-500 mt-0.5">viajará</div>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/60 text-center">
                  <div className="text-[10px] font-bold text-slate-400">Nosotros (մենք)</div>
                  <div className="text-lg font-mono font-black text-indigo-700 mt-1">-emos</div>
                  <div className="text-[10px] italic text-slate-500 mt-0.5">viajaremos</div>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/60 text-center">
                  <div className="text-[10px] font-bold text-slate-400">Vosotros (դուք)</div>
                  <div className="text-lg font-mono font-black text-indigo-700 mt-1">-éis</div>
                  <div className="text-[10px] italic text-slate-500 mt-0.5">viajaréis</div>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/60 text-center">
                  <div className="text-[10px] font-bold text-slate-400">Ellos (նրանք)</div>
                  <div className="text-lg font-mono font-black text-indigo-700 mt-1">-án</div>
                  <div className="text-[10px] italic text-slate-500 mt-0.5">viajarán</div>
                </div>
              </div>
            </div>

            {/* Rule 2: Irregular ending */}
            <div className="mt-6 border-b border-slate-200/80 pb-6">
              <h4 className="text-base md:text-lg font-black text-slate-900 font-fredoka flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-pink-100 text-pink-700 flex items-center justify-center text-xs font-black">2</span>
                Անկանոն բայեր (Verbos Irregulares)
              </h4>
              <p className="text-sm text-slate-705 mt-2 leading-relaxed">
                Որոշ կարևոր բայեր ապառնի ժամանակում փոխում են իրենց արմատները (stem): Սակայն լավ նորությունն այն է, որ <span className="font-bold underline">վերջավորությունները մնում են նույնը</span>, ինչ կանոնավոր բայերինը:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
                <div className="p-3 bg-rose-50/50 border border-pink-100 rounded-xl">
                  <span className="font-bold text-pink-700">hacer (անել)</span>
                  <div className="text-xs text-slate-600 mt-1">Հիմքը դառնում է <span className="font-black font-mono">har-</span></div>
                  <div className="text-xs font-bold text-slate-900">haré, harás, hará...</div>
                </div>
                <div className="p-3 bg-indigo-50/50 border border-indigo-100 rounded-xl">
                  <span className="font-bold text-indigo-700">tener (ունենալ)</span>
                  <div className="text-xs text-slate-600 mt-1">Հիմքը դառնում է <span className="font-black font-mono">tendr-</span></div>
                  <div className="text-xs font-bold text-slate-900">tendré, tendrás, tendrá...</div>
                </div>
                <div className="p-3 bg-emerald-50/50 border border-emerald-100 rounded-xl">
                  <span className="font-bold text-emerald-700">salir (դուրս գալ)</span>
                  <div className="text-xs text-slate-600 mt-1">Հիմքը դառնում է <span className="font-black font-mono">saldr-</span></div>
                  <div className="text-xs font-bold text-slate-900">saldré, saldrás, saldrá...</div>
                </div>
                <div className="p-3 bg-amber-50/50 border border-amber-100 rounded-xl">
                  <span className="font-bold text-amber-700">decir (ասել)</span>
                  <div className="text-xs text-slate-600 mt-1">Հիմքը դառնում է <span className="font-black font-mono">dir-</span></div>
                  <div className="text-xs font-bold text-slate-900">diré, dirás, dirá...</div>
                </div>
                <div className="p-3 bg-violet-50/50 border border-violet-100 rounded-xl">
                  <span className="font-bold text-violet-700">poder (կարողանալ)</span>
                  <div className="text-xs text-slate-600 mt-1">Հիմքը դառնում է <span className="font-black font-mono">podr-</span></div>
                  <div className="text-xs font-bold text-slate-900">podré, podrás, podremos...</div>
                </div>
                <div className="p-3 bg-teal-50/50 border border-teal-100 rounded-xl">
                  <span className="font-bold text-teal-700">haber (լինել/կա)</span>
                  <div className="text-xs text-slate-600 mt-1">Հիմքը դառնում է <span className="font-black font-mono">habr-</span></div>
                  <div className="text-xs font-bold text-slate-900">habrá (կլինի)</div>
                </div>
              </div>
            </div>

            {/* Rule 3: Ir is regular */}
            <div className="mt-6">
              <h4 className="text-base md:text-lg font-black text-slate-900 font-fredoka flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-black">3</span>
                Հետաքրքիր փաստ՝ "ir" բայը 🇪🇸
              </h4>
              <p className="text-sm text-slate-700 mt-2 leading-relaxed">
                Չնայած "ir" (գնալ) բայը իսպաներենի շատ ժամանակներում չափազանց անկանոն է, ապառնի ժամանակում այն կազմվում է <span className="font-bold underline text-emerald-600">կանոնավոր ձևով</span>: Մենք պարզապես վերցնում ենք "ir" անորոշ արմատը և ավելացնում սովորական վերջավորությունները:
              </p>
              <div className="mt-3 p-3 bg-emerald-50 text-emerald-990 rounded-xl font-mono text-center font-bold text-xs sm:text-sm">
                iré (ես կգնամ) • irás (դու կգնաս) • irá (նա կգնա) • iremos (մենք կգնանք)
              </div>
            </div>

          </div>
        )}

      </main>

      {/* Decorative vector-wave floor */}
      <footer id="footer_signature" className="text-center text-xs font-bold text-slate-400 mt-20">
        🇦🇲 Փոքրիկ ճանապարհորդների համար • Միավորներ՝ {score}★ • Իսպաներենի ապառնի ժամանակը 🇪🇸
      </footer>

    </div>
  );
}

// Helper color randomizer rotation for balloon popup styles
function bgGradientRotate(idx: number): string {
  const gradients = [
    'bg-gradient-to-br from-rose-400 to-pink-500 hover:to-rose-500 shadow-rose-200 text-white',
    'bg-gradient-to-br from-amber-400 to-orange-500 hover:to-amber-500 shadow-amber-200 text-white',
    'bg-gradient-to-br from-sky-400 to-blue-500 hover:to-sky-500 shadow-sky-200 text-white',
    'bg-gradient-to-br from-emerald-400 to-teal-500 hover:to-emerald-500 shadow-emerald-200 text-white',
  ];
  return gradients[idx % gradients.length];
}


