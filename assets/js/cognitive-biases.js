(function() {
  'use strict';

  const CAT_COLORS = {
    estimation:"#c8440a", decision:"#2a6b5e", hypothesis:"#b89b3e",
    attribution:"#5c3d8f", memory:"#1a6b8a", social:"#7a4a1e"
  };

  const STORAGE_KEYS = {
    READ: 'cognitive-biases-read',
    STREAK: 'cognitive-biases-streak',
    LAST_VISIT: 'cognitive-biases-last-visit',
    NOTES: 'cognitive-biases-notes',
    QUIZ_SCORES: 'cognitive-biases-quiz'
  };

  const biases = [
    {id:1,cat:"estimation",name:"Anchoring Bias",tagline:"The first number you hear becomes your north star.",summary:"We rely too heavily on the first piece of information offered when making decisions. Once an anchor is set, all subsequent judgments are made in relation to it — even if the anchor is arbitrary.",example:'"The jacket was originally $500, now $200!" Feels like a deal — even if $200 is still overpriced.',antidote:"Before seeing a price, estimate your own value first. Ask: what would I pay if I hadn't seen that number?",realWorld:["Salary negotiations","Real estate pricing","Legal settlements"],keywords:["negotiation","price","first impression"]},
    {id:2,cat:"estimation",name:"Availability Heuristic",tagline:"If you can think of it easily, it must be common.",summary:"We judge the probability of events by how easily examples come to mind. Vivid, recent, or emotionally charged events feel more likely than they actually are.",example:"After seeing a plane crash on the news, people drive instead of fly — despite flying being far safer.",antidote:"Ask: how many examples exist in reality, not how easily you can think of one?",realWorld:["Risk perception","Shark fear vs. vending machine fear","Crime rate misjudgments"],keywords:["probability","risk","memory"]},
    {id:3,cat:"estimation",name:"Dunning-Kruger Effect",tagline:"The less you know, the more confident you feel.",summary:"People with limited knowledge overestimate their competence. Experts often underestimate themselves because they're aware of how much they don't know.",example:"After reading one article about vaccines, someone feels qualified to debate epidemiologists.",antidote:"Chase the 'Mount Stupid' descent. The discomfort of realizing your ignorance is the beginning of expertise.",realWorld:["Online debates","DIY disasters","Early career overconfidence"],keywords:["confidence","expertise","ignorance"]},
    {id:4,cat:"estimation",name:"Base Rate Fallacy",tagline:"The average matters more than the anecdote.",summary:"Ignoring general statistical information in favour of specific case information, even when the general data is more informative and predictive.",example:"Assuming someone is a librarian because they're quiet and bookish, ignoring that there are far more farmers than librarians.",antidote:"Always ask: what's the base rate? How common is this in the general population?",realWorld:["Medical diagnosis","Profiling","Job application decisions"],keywords:["statistics","probability","context"]},
    {id:5,cat:"estimation",name:"Optimism Bias",tagline:"You think bad things happen to other people.",summary:"Overestimating the probability of positive outcomes and underestimating negative ones specifically for oneself.",example:"Most people believe they're less likely than average to get divorced, have an accident, or develop cancer.",antidote:"Use base rates and outside perspectives. Ask how this usually turns out for everyone, not just you.",realWorld:["Startup survival estimates","Health risk underestimation","Project timelines"],keywords:["optimism","risk","future"]},
    {id:6,cat:"estimation",name:"Pessimism Bias",tagline:"Your worst case becomes your expected case.",summary:"Overestimating the likelihood of negative events — prevalent in depression and anxiety as a systematic distortion.",example:"A depressed person consistently predicts worse outcomes than statistics would suggest for their situation.",antidote:"Track predictions vs outcomes. Depression often makes pessimism feel like realism; data corrects this.",realWorld:["Mental health","Investment fear","Career avoidance"],keywords:["pessimism","anxiety","negativity"]},
    {id:7,cat:"estimation",name:"Planning Fallacy",tagline:"Everything will take longer and cost more than you think.",summary:"We underestimate the time, costs, and risks of future actions while overestimating the benefits. We focus on the best-case scenario rather than realistic distributions.",example:"The Sydney Opera House was planned for 6 years. It took 16. Budget: $7M. Actual: $102M.",antidote:"Use the 'outside view': how long did similar projects actually take? Don't trust your inside view alone.",realWorld:["Construction projects","Software development","Personal goal-setting"],keywords:["planning","time","estimation"]},
    {id:8,cat:"estimation",name:"Impact Bias",tagline:"The good and the bad will affect you less than you expect.",summary:"Overestimating the intensity and duration of emotional reactions to future events — we adapt faster than we predict.",example:"People think winning the lottery will make them permanently happy. The hedonic baseline returns much faster than expected.",antidote:"Remember: you've adapted to every previous life change. This one will be no different.",realWorld:["Major purchases","Career decisions","Relationship choices"],keywords:["emotion","adaptation","happiness"]},
    {id:9,cat:"estimation",name:"Gambler's Fallacy",tagline:"Past randomness doesn't owe you anything.",summary:"Believing that past random events affect future independent probabilities. After five heads, tails feels 'due' — but each flip is independent.",example:"'I've lost five hands in a row, so I must be due for a win.' The cards have no memory.",antidote:"Ask: are these events truly independent? If yes, past results are completely irrelevant.",realWorld:["Gambling","Investment 'corrections'","Sports betting"],keywords:["random","probability","independence"]},
    {id:10,cat:"estimation",name:"Hot-Hand Fallacy",tagline:"Streaks feel meaningful in random sequences.",summary:"The belief that a person who has experienced success at a random event has a greater chance of further success.",example:"Betting on a basketball player because they've made their last five shots — but shots are largely independent events.",antidote:"Look for actual skill-based streaks vs random ones. Not all streaks are equal.",realWorld:["Sports betting","Investment management","Slot machines"],keywords:["streak","random","sports"]},
    {id:11,cat:"estimation",name:"Conjunction Fallacy",tagline:"More detail feels more probable — it isn't.",summary:"Assuming that specific conditions are more probable than a single general condition — even though this is mathematically impossible.",example:"People rate 'Linda is a bank teller AND a feminist' more likely than 'Linda is a bank teller.'",antidote:"More specific = less probable by definition. Every added condition can only reduce the probability.",realWorld:["Legal judgments","Medical diagnosis","Risk assessment"],keywords:["probability","logic","detail"]},
    {id:12,cat:"estimation",name:"Insensitivity to Sample Size",tagline:"Small samples lie louder than large ones.",summary:"Failing to appreciate that small samples have far more variance than large ones — over-trusting conclusions from tiny data.",example:"A small clinic reports higher boy birth rates than a large hospital — small samples fluctuate wildly.",antidote:"Ask: how large was the sample? Small samples produce extreme results regularly by chance alone.",realWorld:["Medical studies","Business A/B testing","Opinion polls"],keywords:["sample","statistics","data"]},
    {id:13,cat:"estimation",name:"Hard-Easy Effect",tagline:"You're overconfident about easy things, underconfident about hard ones.",summary:"A systematic miscalibration of difficulty: overconfidence on tasks perceived as easy, under-confidence on tasks perceived as hard.",example:"People are overconfident answering easy quiz questions and under-confident on harder ones.",antidote:"Calibrate regularly. Keep a record of predictions vs outcomes to detect your personal miscalibration.",realWorld:["Expert overconfidence","Test preparation","Investment forecasting"],keywords:["confidence","difficulty","calibration"]},
    {id:14,cat:"estimation",name:"Unit Bias",tagline:"If it's served as one portion, one portion feels right.",summary:"The standard suggested amount of consumption is perceived as appropriate — people consume a full unit even when it's too much.",example:"Finishing an entire restaurant portion even when full, because the serving size implies it's the right amount.",antidote:"Decide before you start how much is appropriate for you. Don't let the container decide.",realWorld:["Food overconsumption","Drink sizes","Software feature bloat"],keywords:["portion","consumption","defaults"]},
    {id:15,cat:"estimation",name:"Scope Neglect",tagline:"We care about one as much as a million.",summary:"Being insensitive to the magnitude of a problem when evaluating it. Caring nearly the same whether 2,000 or 200,000 are affected.",example:"Willingness to donate is nearly the same whether 2,000 or 200,000 birds need saving.",antidote:"Force yourself to actually process scale. 100,000 is literally 50x more than 2,000. Does your response reflect that?",realWorld:["Charitable giving","Policy evaluation","Environmental decisions"],keywords:["scale","magnitude","empathy"]},
    {id:16,cat:"estimation",name:"Time-Saving Bias",tagline:"Speed gains at high speeds feel bigger than they are.",summary:"Underestimating time saved by increasing from a low speed, and overestimating time saved by increasing from a high speed.",example:"Going from 25 to 50 mph saves far more time per trip than going from 75 to 100 mph. Most people get this backwards.",antidote:"Do the math. Time saved = (distance / slow speed) - (distance / fast speed). Intuition misleads here.",realWorld:["Driving behavior","Logistics planning","Workflow optimization"],keywords:["time","speed","math"]},
    {id:17,cat:"estimation",name:"Weber-Fechner Law",tagline:"Your senses are logarithmic, not linear.",summary:"The difficulty in perceiving and comparing small differences in large quantities — perception is logarithmic, not linear.",example:"The difference between 1 and 2 kg feels much larger than 50 and 51 kg, though both differ by exactly 1 kg.",antidote:"When dealing with large numbers, check proportional differences, not absolute ones.",realWorld:["Pricing perception","Salary negotiation","Sound and light design"],keywords:["perception","logarithm","senses"]},
    {id:18,cat:"estimation",name:"Exaggerated Expectation",tagline:"Reality regresses toward the mean; your imagination doesn't.",summary:"Expecting more extreme outcomes than actually occur — both positive and negative predictions overshoot reality.",example:"Predicting a vacation will be transformative and life-altering; in reality, life returns to normal quickly.",antidote:"Look at how similar events have actually played out for others. The mean is usually less dramatic than your forecast.",realWorld:["Vacation planning","Relationship expectations","Career milestone anticipation"],keywords:["expectations","reality","extremes"]},
    {id:19,cat:"estimation",name:"Illusion of Validity",tagline:"Consistent-looking data breeds false confidence.",summary:"Overestimating the accuracy of one's judgments, especially when available information seems internally consistent.",example:"A financial analyst is highly confident in predictions that are essentially coin flips in aggregate.",antidote:"Track your forecasting record. Confidence and accuracy correlate far less than people assume.",realWorld:["Clinical judgment","Investment analysis","HR selection"],keywords:["validity","confidence","prediction"]},
    {id:20,cat:"estimation",name:"Restraint Bias",tagline:"You overestimate your own willpower.",summary:"Overestimating one's ability to show restraint in the face of temptation — which leads to overexposure to it.",example:"'I can have just one chip' — leading to bringing the whole bag to the couch.",antidote:"Design your environment, not your willpower. Remove the temptation; don't rely on resisting it.",realWorld:["Diet and health","Addiction recovery","Procrastination"],keywords:["willpower","temptation","self-control"]},
    {id:21,cat:"estimation",name:"Hungry Judge Effect",tagline:"Your body votes on decisions your mind thinks it's making.",summary:"Bodily states like hunger and fatigue affect judgments about completely unrelated external matters.",example:"Parole judges grant more favorable rulings right after meals; rates drop dramatically just before.",antidote:"Schedule important decisions when you are fed, rested, and not under physical stress.",realWorld:["Legal decisions","Medical diagnosis","Job interviews"],keywords:["hunger","fatigue","decision"]},
    {id:22,cat:"estimation",name:"Subadditivity Effect",tagline:"Parts seem more likely than the whole they make up.",summary:"Judging the probability of the whole to be less than the sum of its parts — a failure of probabilistic reasoning.",example:"Judging a set of individual cancer risk factors as collectively more likely than 'some form of cancer overall.'",antidote:"Probabilities of parts must sum to the whole, not exceed it. Check your math.",realWorld:["Risk assessment","Legal probability estimation","Medical prognosis"],keywords:["probability","parts","whole"]},
    {id:23,cat:"estimation",name:"Aesthetic-Usability Effect",tagline:"Beauty buys a lot of forgiveness.",summary:"Perceiving attractive things as more usable — underestimating flaws in beautiful products and interfaces.",example:"Users tolerate bugs in beautifully designed apps they wouldn't accept from ugly ones.",antidote:"Evaluate function separately from form. Create a usability checklist that ignores aesthetics.",realWorld:["Product design","UI/UX","Brand evaluation"],keywords:["design","beauty","usability"]},
    {id:24,cat:"estimation",name:"Conservatism Bias",tagline:"You update your beliefs too slowly.",summary:"Insufficiently revising beliefs when new evidence arrives — anchoring too heavily to prior beliefs and updating too slowly.",example:"A doctor sticking with an original diagnosis despite accumulating contradictory test results.",antidote:"When new evidence arrives, ask: if I had no prior belief, what would this evidence alone tell me?",realWorld:["Medical diagnosis","Investment strategy","Scientific consensus"],keywords:["beliefs","evidence","updating"]},
    {id:25,cat:"estimation",name:"Travis Syndrome",tagline:"Every generation thinks it lives at history's pivot point.",summary:"Overestimating the significance of the present moment as uniquely important or transformative in history.",example:"Every generation believes it lives at the most critical inflection point in human civilization.",antidote:"Study history. Most 'unprecedented' moments were not, and most 'critical junctures' weren't decisive.",realWorld:["Political commentary","Tech hype cycles","Generational identity"],keywords:["present","history","significance"]},
    {id:26,cat:"estimation",name:"Attribute Substitution",tagline:"Hard questions get replaced by easier ones without you noticing.",summary:"When facing a complex judgment, unconsciously substituting a simpler related question — the engine of most heuristics.",example:"'How much do I trust this person?' is silently answered by 'How much do I like them?'",antidote:"Explicitly name the question you're actually trying to answer. Is that the one you're answering?",realWorld:["Voting behavior","Hiring decisions","Medical triage"],keywords:["substitution","heuristics","judgment"]},
    {id:27,cat:"estimation",name:"Worse-Than-Average Effect",tagline:"Hard tasks make you underestimate yourself.",summary:"For tasks perceived as genuinely difficult, people believe themselves to be below average — the inverse of illusory superiority.",example:"Most people believe they are below-average drivers on icy roads — even when actual skill is average.",antidote:"Gather objective data. Self-perception on hard tasks is systematically pessimistic.",realWorld:["Math anxiety","Impostor syndrome","New skill learning"],keywords:["self-assessment","difficulty","pessimism"]},

    {id:28,cat:"decision",name:"Loss Aversion",tagline:"Losing $100 hurts twice as much as gaining $100 feels good.",summary:"The pain of losing is psychologically about twice as powerful as the pleasure of gaining the same amount — a foundational finding of behavioral economics.",example:"Being more motivated to avoid losing $50 than to work for a gain of $100.",antidote:"Ask: what would a neutral observer choose? Reframe choices as both gains and losses to cancel out the bias.",realWorld:["Investment decisions","Insurance overbuying","Negotiation deadlocks"],keywords:["loss","gain","pain"]},
    {id:29,cat:"decision",name:"Sunk Cost Fallacy",tagline:"Past pain shouldn't drive future decisions — but it does.",summary:"Continuing an endeavour because of prior investment (money, time, effort) rather than future expected value. Sunk costs are gone regardless of future action.",example:"Sitting through a terrible 2-hour movie because you already paid $15.",antidote:"Ask: if I had no history with this, would I still choose to continue?",realWorld:["Staying in bad relationships","Doubling down on failing projects","Holding losing stocks"],keywords:["sunk cost","investment","past"]},
    {id:30,cat:"decision",name:"Status Quo Bias",tagline:"The default is always tempting, even when it's wrong.",summary:"Preferring the current state of affairs — changes from the baseline are perceived as losses, even when changing is clearly beneficial.",example:"Most people stick with default retirement fund allocations and organ donation status regardless of whether defaults suit them.",antidote:"Reframe: what would I actively choose if I were starting fresh today with no defaults?",realWorld:["Organ donation rates by country","401k enrollment","Software and app defaults"],keywords:["default","change","inertia"]},
    {id:31,cat:"decision",name:"Framing Effect",tagline:"Same facts, different feelings — it's all in the packaging.",summary:"Drawing different conclusions from the same information depending on how it is presented. Identical content feels entirely different when framed as a gain vs. a loss.",example:'"Ground beef that is 90% fat-free" sells better than "10% fat" — same product.',antidote:"Rephrase: convert gains to losses and losses to gains. See if your opinion shifts. If it does, you've been framed.",realWorld:["Medical decision-making","Political messaging","Consumer marketing"],keywords:["framing","presentation","context"]},
    {id:32,cat:"decision",name:"Hyperbolic Discounting",tagline:"Future you has different preferences than present you.",summary:"Strongly preferring immediate rewards over future ones — preferences change dramatically depending on how far away the reward is.",example:"74% chose fruit for next week's diet; 70% chose chocolate for today — the same people, different timeframe.",antidote:"Commit in advance. Pre-commitment devices (automatic savings, buying healthy food) remove the moment-of-choice temptation.",realWorld:["Savings behavior","Dieting","Exercise habits"],keywords:["discounting","future","immediate"]},
    {id:33,cat:"decision",name:"Default Effect",tagline:"The default option is a powerful hidden choice.",summary:"Strongly favouring the default option when given a choice, due to inertia and the implicit sense that defaults are endorsed.",example:"Opt-out organ donation countries have dramatically higher donation rates than opt-in — same information, different default.",antidote:"Ask: did I actively choose this, or did I just never change it? Those are very different things.",realWorld:["Organ donation","Pension enrollment","Software permissions"],keywords:["default","choice","inertia"]},
    {id:34,cat:"decision",name:"Decoy Effect",tagline:"A bad option can make a mediocre one look great.",summary:"Preferences between options A and B change when a third (dominated) option C is introduced — making B look more attractive.",example:"A streaming service adds a mid-tier plan that makes the premium plan look like a better deal by comparison.",antidote:"Evaluate each option on its own merits. Ask: is this good in absolute terms, or just relative to a decoy?",realWorld:["Subscription pricing","Restaurant menus","Product packaging"],keywords:["decoy","pricing","comparison"]},
    {id:35,cat:"decision",name:"Zero-Risk Bias",tagline:"Complete elimination of a small risk beats a big reduction in a large one.",summary:"Preferring to completely eliminate one risk rather than achieving a much larger overall reduction across multiple risks.",example:"People prefer to eliminate a small risk entirely over halving a much larger risk — even when the latter saves more lives.",antidote:"Think in expected value. A 50% reduction in a large risk is better than 100% elimination of a small one.",realWorld:["Policy making","Personal health decisions","Insurance purchasing"],keywords:["risk","elimination","safety"]},
    {id:36,cat:"decision",name:"Endowment Effect",tagline:"Owning something makes it feel more valuable.",summary:"Valuing things more once you own them — demanding much more to give up an object than you would pay to acquire it.",example:"People asked to sell a coffee mug demand nearly twice what buyers are willing to pay for the identical mug.",antidote:"Ask: if I didn't already own this, would I buy it at the price I'm asking to sell it for?",realWorld:["Real estate","Negotiation","Startup equity"],keywords:["ownership","value","selling"]},
    {id:37,cat:"decision",name:"Escalation of Commitment",tagline:"The deeper in you are, the harder it is to walk away.",summary:"Increasing investment in a failing decision because of cumulative prior investment, despite mounting evidence the decision was wrong.",example:"Continuing to fund a failing startup project because the team has already spent two years on it.",antidote:"Evaluate decisions based on future expected value, not past investment. Sunk costs don't earn returns.",realWorld:["Project management","Military campaigns","Relationships"],keywords:["commitment","escalation","failure"]},
    {id:38,cat:"decision",name:"Action Bias",tagline:"Doing something always feels better than doing nothing.",summary:"Acting even when inaction would be more effective — psychological discomfort with doing nothing leads to counterproductive intervention.",example:"Soccer goalkeepers dive for penalty kicks even though staying central is statistically the optimal strategy.",antidote:"Ask: is action definitely better here, or does it just feel better? Sometimes the best move is no move.",realWorld:["Medical treatment","Economic policy","Crisis management"],keywords:["action","inaction","intervention"]},
    {id:39,cat:"decision",name:"Ambiguity Effect",tagline:"Known odds beat unknown odds, even when unknowns might be better.",summary:"Avoiding options whose probability of a favorable outcome is unknown, preferring known probabilities even when unknown ones might be superior.",example:"People prefer a known 50/50 bet over an ambiguous unknown-odds bet, even if the unknown might be better.",antidote:"Ambiguity isn't the same as low probability. Explore before defaulting to the familiar.",realWorld:["Investment behavior","Career choices","Medical treatment selection"],keywords:["ambiguity","uncertainty","known"]},
    {id:40,cat:"decision",name:"Denomination Effect",tagline:"Big bills feel more 'real' than small ones.",summary:"Spending more when money is in small denominations because small bills and coins feel less significant than large ones.",example:"People are less likely to break a $50 bill for a small purchase than to use the equivalent in loose change.",antidote:"Budget in total amounts, not denomination. The wallet contents don't determine value.",realWorld:["Consumer spending","Casino chips","Mobile payments"],keywords:["money","denomination","spending"]},
    {id:41,cat:"decision",name:"Disposition Effect",tagline:"You sell your winners and hold your losers.",summary:"The tendency to sell assets that have risen in value prematurely while holding onto assets that have fallen, hoping they recover.",example:"Investors lock in gains quickly but hold losers for years — the opposite of a rational tax and return strategy.",antidote:"Ask: if I owned cash instead of this position, would I buy it today at this price?",realWorld:["Stock trading","Real estate","Business divestiture"],keywords:["selling","holding","investing"]},
    {id:42,cat:"decision",name:"Money Illusion",tagline:"Nominal numbers seduce more than real ones.",summary:"Focusing on the nominal face value of money rather than its real inflation-adjusted purchasing power.",example:"A 3% raise feels like a win even when inflation is 4% — real wealth actually decreased.",antidote:"Always adjust for inflation. A number with more zeros isn't always more money.",realWorld:["Wage negotiations","Savings accounts","Retirement planning"],keywords:["inflation","nominal","real"]},
    {id:43,cat:"decision",name:"Normalcy Bias",tagline:"Catastrophes can't happen here — until they do.",summary:"Refusing to plan for or react to disasters that haven't happened before — massively underestimating the likelihood and impact of catastrophic events.",example:"Residents ignore evacuation orders because 'the storm has never been this bad before.'",antidote:"Prepare for events based on what's possible, not just what's historically happened locally.",realWorld:["Emergency preparedness","Business continuity","Climate planning"],keywords:["disaster","preparation","catastrophe"]},
    {id:44,cat:"decision",name:"Pseudocertainty Effect",summary:"Making risk-averse choices when expected outcomes look good, but risk-seeking choices when outcomes look bad.",example:"Gamblers who avoid risk when winning but bet recklessly trying to break even.",antidote:"Apply consistent risk principles. Don't let the current score change how you evaluate probabilities.",realWorld:["Gambling","Investment behavior","Business decisions under pressure"],keywords:["risk","certainty","gambling"]},
    {id:45,cat:"decision",name:"Projection Bias",tagline:"You shop hungry and regret it later.",summary:"Overestimating how much one's future self will share current preferences, moods, and emotional states.",example:"Shopping hungry leads to buying far more food than needed — current hunger is projected into future preferences.",antidote:"Ask: what would I think about this when I'm in a different state? Buy when full, plan when calm.",realWorld:["Consumer choices","Vacation planning","Impulsive purchases"],keywords:["projection","future self","preferences"]},
    {id:46,cat:"decision",name:"Present Bias",tagline:"Now is worth far more than later, even when it shouldn't be.",summary:"Giving disproportionately stronger weight to payoffs closer in time, regardless of their actual relative value.",example:"Choosing a $50 reward today over a $100 reward next month — implying a 100% monthly discount rate.",antidote:"Commit in advance. The future self will be grateful. Use automatic mechanisms that bypass the present-biased self.",realWorld:["Retirement savings","Health behavior","Academic procrastination"],keywords:["present","future","discounting"]},
    {id:47,cat:"decision",name:"Reactance",tagline:"Tell someone they can't, and suddenly they want to.",summary:"Doing the opposite of what someone wants as a response to perceived constraints on freedom of choice.",example:"A teenager does exactly what a parent forbids, specifically because it was forbidden.",antidote:"Offer choices rather than ultimatums. People comply more when autonomy is preserved.",realWorld:["Parenting","Marketing","Policy compliance"],keywords:["reactance","freedom","restriction"]},
    {id:48,cat:"decision",name:"Risk Compensation",tagline:"Safety equipment sometimes creates more risk than it removes.",summary:"Taking greater risks when safety measures are present, because the perceived danger decreases proportionately.",example:"Cyclists wearing helmets have been found to take more risks on roads — counteracting some safety benefit.",antidote:"Separate objective risk from perceived risk. Don't let protection change your behavior to an unsafe degree.",realWorld:["Road safety","Sports equipment","Financial hedging"],keywords:["safety","risk","compensation"]},
    {id:49,cat:"decision",name:"Neglect of Probability",tagline:"You react to what's possible, not what's likely.",summary:"Completely disregarding probability when making decisions under uncertainty — responding to possibility rather than likelihood.",example:"Being more afraid of rare shark attacks than daily car commutes after watching a scary film.",antidote:"Always ask: how likely is this, not just how bad? Possibility without probability is not a useful guide.",realWorld:["Fear-based decisions","Insurance","Security policy"],keywords:["probability","possibility","likelihood"]},
    {id:50,cat:"decision",name:"Compassion Fade",tagline:"One face moves us more than a million statistics.",summary:"Feeling and acting more compassionately toward a small number of identifiable victims than to a large anonymous group.",example:"One child's photograph raises more donations than statistics about millions in poverty.",antidote:"Be aware of identifiable victim effects. Make yourself confront scale. 1 million is 1,000 times more than 1,000.",realWorld:["Charitable giving","Humanitarian crises","Political rhetoric"],keywords:["compassion","empathy","scale"]},
    {id:51,cat:"decision",name:"Less-is-Better Effect",tagline:"Incomplete can outvalue complete when evaluated in isolation.",summary:"Preferring a smaller set to a larger one when evaluated separately, even when the larger set is objectively better.",example:"An intact 16-piece dinnerware set is valued more than a 24-piece set with two broken items when seen separately.",antidote:"Evaluate options jointly when possible. Separate evaluation corrupts judgment of absolute quality.",realWorld:["Gift giving","Employee evaluation","Product launches"],keywords:["less","more","evaluation"]},
    {id:52,cat:"decision",name:"Functional Fixedness",tagline:"A tool is always just its label.",summary:"A tendency limiting a person to using objects only in the way they are traditionally used, blocking creative solutions.",example:"Failing to use a coin as a screwdriver in an emergency — because a coin is mentally categorized as 'money.'",antidote:"Describe the physical properties of objects, not their names. What can this shape and material do?",realWorld:["Problem-solving","Innovation","Engineering"],keywords:["function","creativity","tools"]},
    {id:53,cat:"decision",name:"IKEA Effect",tagline:"You love what you built, regardless of how it turned out.",summary:"Placing disproportionately high value on objects one partially created, regardless of the objective quality of the output.",example:"People value IKEA furniture they assembled themselves more than identical pre-assembled furniture — and rate their mediocre origami as highly as experts' work.",antidote:"Seek outside evaluation. Your effort invested is not evidence of quality produced.",realWorld:["Product design","Startup founders","DIY projects"],keywords:["effort","creation","value"]},
    {id:54,cat:"decision",name:"Reactive Devaluation",tagline:"A good idea from the wrong person becomes a bad idea.",summary:"Devaluing proposals solely because they came from an adversary, regardless of the proposal's actual merit.",example:"A peace proposal is rejected not for its content but because the other side proposed it.",antidote:"Evaluate proposals anonymously when possible. Ask: if our side had proposed this, would we accept it?",realWorld:["Negotiations","Political bipartisanship","Labor disputes"],keywords:["adversary","proposal","evaluation"]},
    {id:55,cat:"decision",name:"Distinction Bias",tagline:"Side-by-side comparison exaggerates differences.",summary:"Viewing two options as more dissimilar when evaluating them simultaneously than when evaluating them separately and sequentially.",example:"Two very similar televisions seem dramatically different side-by-side; weeks apart, they'd feel equivalent.",antidote:"Simulate how each option would feel independently. Is the difference meaningful in real daily life?",realWorld:["Consumer electronics","Hiring","Performance reviews"],keywords:["comparison","difference","evaluation"]},
    {id:56,cat:"decision",name:"Doubling-Back Aversion",tagline:"Backtracking feels like failure, even when it's the fastest way.",summary:"Avoiding retracing steps even when doing so would clearly save time, because it feels psychologically like undoing progress.",example:"Driving a longer route rather than turning back, even when backtracking is measurably faster.",antidote:"Progress is measured by arrival, not by the path. Sometimes going back is the fastest way forward.",realWorld:["Navigation","Project management","Career pivots"],keywords:["backtracking","progress","path"]},
    {id:57,cat:"decision",name:"Mere Exposure Effect",tagline:"Familiar feels good, even when nothing else changed.",summary:"Developing a preference for things merely because of repeated exposure and familiarity, without any rational evaluation.",example:"Songs become more likeable after repeated radio play, even when initially disliked.",antidote:"Ask: do I like this because it's genuinely good, or just because it's familiar to me?",realWorld:["Brand marketing","Political name recognition","Music charts"],keywords:["familiarity","exposure","preference"]},
    {id:58,cat:"decision",name:"Well-Travelled Road Effect",tagline:"Your usual route always feels fastest.",summary:"Underestimating travel time on familiar routes and overestimating duration on unfamiliar ones.",example:"Commuters consistently believe their regular route is faster than alternatives — even when they've never timed them.",antidote:"Time alternatives at least once. Familiarity creates an illusion of speed.",realWorld:["Commuting","Business processes","Software workflows"],keywords:["familiar","route","time"]},
    {id:59,cat:"decision",name:"Semmelweis Reflex",tagline:"New evidence that threatens old beliefs gets rejected first.",summary:"The tendency to reject new evidence that contradicts an established paradigm or institutional belief, regardless of quality.",example:"The medical establishment rejected Semmelweis's handwashing evidence for years because it contradicted accepted theory.",antidote:"Separate 'this contradicts what I believe' from 'this evidence is weak.' They're different objections.",realWorld:["Scientific paradigms","Organizational change","Medicine"],keywords:["evidence","paradigm","rejection"]},
    {id:60,cat:"decision",name:"Shared Information Bias",tagline:"Groups keep discussing what everyone already knows.",summary:"Groups spending more time on information everyone already shares and less on unique knowledge only some members have.",example:"A hiring committee repeatedly discusses the same three known facts about a candidate while ignoring novel insights only one member has.",antidote:"Explicitly ask: what does each person know that others don't? Design meetings to surface unique information.",realWorld:["Team decision-making","Medical rounds","Corporate boards"],keywords:["group","information","discussion"]},
    {id:61,cat:"decision",name:"Authority Bias",tagline:"The badge matters more than the argument.",summary:"Attributing greater accuracy to the opinion of authority figures and being more influenced by their views regardless of content.",example:"Patients accept diagnoses more readily when presented by doctors with more impressive credentials — same diagnosis, different reception.",antidote:"Evaluate the argument, not the arguer. Ask: is this good evidence regardless of who presented it?",realWorld:["Medical compliance","Academic peer review","Corporate hierarchy"],keywords:["authority","expert","credibility"]},
    {id:62,cat:"decision",name:"Automation Bias",tagline:"The machine said so, so it must be right.",summary:"Excessive dependence on automated systems, leading to erroneous automated information overriding correct human judgment.",example:"Pilots over-relying on autopilot miss instrument anomalies that careful manual monitoring would catch.",antidote:"Treat automated outputs as inputs to judgment, not as replacements for it.",realWorld:["Aviation","Medical diagnosis software","Financial trading algorithms"],keywords:["automation","trust","machines"]},
    {id:63,cat:"decision",name:"Additive Bias",tagline:"When in doubt, add more.",summary:"Solving problems by adding elements — features, steps, rules — even when subtraction would be more effective.",example:"When asked to improve a recipe, participants overwhelmingly added ingredients rather than removing existing ones.",antidote:"Before adding anything, ask: what could I remove? Subtraction is underexplored as a solution strategy.",realWorld:["Product design","Organizational policy","Software development"],keywords:["addition","subtraction","solutions"]},
    {id:64,cat:"decision",name:"Outcome Bias",tagline:"We judge decisions by results, not quality.",summary:"Judging a decision by its eventual outcome rather than the quality of the decision at the time it was made.",example:"A surgeon who took a justified risk is blamed if the patient dies, praised if they survive — same decision, different luck.",antidote:"Evaluate processes independently of outcomes. Bad outcomes can follow good decisions; good outcomes can follow bad ones.",realWorld:["Medical malpractice","Investment post-mortems","Sports coaching"],keywords:["outcome","process","judgment"]},
    {id:65,cat:"decision",name:"Prevention Bias",tagline:"Stopping bad things feels more valuable than responding to them.",summary:"Perceiving that money spent on prevention buys more security than equal money spent on detection and response, even when both are equally effective.",example:"Companies overspend on firewalls but underspend on breach response — even when both are equally effective per dollar.",antidote:"Analyse prevention and response on equal terms using expected value, not emotional weight.",realWorld:["Cybersecurity","Healthcare","Emergency management"],keywords:["prevention","response","security"]},
    {id:66,cat:"decision",name:"Non-Adaptive Choice Switching",tagline:"Once burned, you avoid the fire — even when it's safe.",summary:"After a bad outcome, avoiding the previously made choice even when it was statistically optimal — 'once bitten, twice shy.'",example:"Never betting on red again after red lost — even though the wheel has no memory.",antidote:"Evaluate whether your new caution is data-based or emotionally driven by a single bad experience.",realWorld:["Gambling","Investment diversification","Medical treatment choices"],keywords:["experience","caution","learning"]},

    {id:67,cat:"hypothesis",name:"Confirmation Bias",tagline:"Your brain is a yes-man for your existing beliefs.",summary:"Seeking, interpreting, and remembering information in a way that confirms what we already believe while filtering out contradicting evidence.",example:'A manager who "knows" an employee is unreliable notices every late arrival but forgets the 20 times they stayed late.',antidote:"Actively seek disconfirming evidence. Ask: what would prove me wrong?",realWorld:["Political news consumption","Medical self-diagnosis","Hiring decisions"],keywords:["confirmation","beliefs","evidence"]},
    {id:68,cat:"hypothesis",name:"Illusory Truth Effect",tagline:"Repetition is the mother of conviction.",summary:"Believing statements are true simply because they've been heard multiple times — familiarity masquerades as truth.",example:"Repeated misinformation in political campaigns becomes more believed over time regardless of fact-checks.",antidote:"Ask: do I believe this because of evidence, or because I've heard it many times?",realWorld:["Political propaganda","Advertising","Social media misinformation"],keywords:["repetition","truth","familiarity"]},
    {id:69,cat:"hypothesis",name:"Groupthink",tagline:"Harmony kills honesty.",summary:"The desire for harmony in a group results in irrational decision-making as dissenting views are suppressed and independent thinking discouraged.",example:"A team unanimously approves a flawed plan to avoid conflict, even though several members privately had doubts.",antidote:"Assign a devil's advocate. Make it structurally safe to disagree. Separate idea generation from evaluation.",realWorld:["Corporate boards","Government cabinets","Scientific committees"],keywords:["group","harmony","dissent"]},
    {id:70,cat:"hypothesis",name:"Illusion of Explanatory Depth",tagline:"You understand far less than you think you do.",summary:"Believing one understands a topic much better than one actually does — especially for mechanisms, systems, and processes.",example:"People who claim to understand how a zip-lock bag works fail completely when asked to draw and explain the mechanism.",antidote:"Use the 'explain it to a 10-year-old' test. If you can't, your understanding is shallower than you thought.",realWorld:["Policy debates","Technical product use","Medical treatment understanding"],keywords:["understanding","depth","explanation"]},
    {id:71,cat:"hypothesis",name:"Barnum / Forer Effect",tagline:"Vague praise feels like a portrait of you.",summary:"Giving high accuracy ratings to vague, general personality descriptions assumed to be tailored specifically to oneself.",example:"Horoscopes feel eerily accurate because they're written to apply to nearly everyone who reads them.",antidote:"Ask: could this describe most people? If yes, it's not a genuine description of you specifically.",realWorld:["Astrology","Cold reading","Certain personality tests"],keywords:["vague","personality","horoscope"]},
    {id:72,cat:"hypothesis",name:"Belief Bias",tagline:"Believable conclusions make bad logic feel valid.",summary:"Evaluating the logical strength of an argument based on how believable the conclusion is, rather than the actual logical structure.",example:"Accepting a logically flawed argument if the conclusion matches your beliefs; rejecting a valid one if it doesn't.",antidote:"Separate: is this argument logically valid? Is the conclusion true? These are different questions.",realWorld:["Political reasoning","Legal argument","Scientific skepticism"],keywords:["logic","belief","argument"]},
    {id:73,cat:"hypothesis",name:"Rhyme-as-Reason Effect",tagline:"Rhymes sound like truths.",summary:"Perceiving rhyming statements as more truthful or accurate than non-rhyming equivalents with the same content.",example:'"If the glove doesn\'t fit, you must acquit" — the rhyme added persuasive power beyond the logical argument.',antidote:"Rephrase in non-rhyming prose. Does it still seem as compelling?",realWorld:["Legal rhetoric","Advertising slogans","Political catchphrases"],keywords:["rhyme","truth","persuasion"]},
    {id:74,cat:"hypothesis",name:"Fluency Heuristic",tagline:"Easy to read, easy to believe.",summary:"Judging more fluently processed information as more truthful or of higher quality, regardless of its actual content.",example:"Companies with easy-to-pronounce names are rated as more trustworthy than ones with complex names — same business.",antidote:"Ask: is this persuasive because it's well-expressed, or because the underlying claim is strong?",realWorld:["Brand naming","Academic writing","Political speechwriting"],keywords:["fluency","readability","trust"]},
    {id:75,cat:"hypothesis",name:"Agent Detection Bias",tagline:"We see intent where there is none.",summary:"The inclination to assume purposeful intervention by a sentient agent even in random, unguided events.",example:"Hearing a noise in the dark and immediately assuming it's someone rather than the house settling.",antidote:"Ask: what's the simplest non-agent explanation? Occam's razor first.",realWorld:["Superstition","Conspiracy theories","Religious attribution"],keywords:["agent","intent","random"]},
    {id:76,cat:"hypothesis",name:"Availability Cascade",tagline:"Repeat something long enough and it becomes true.",summary:"A self-reinforcing process where a collective belief gains plausibility through increasing repetition in public discourse.",example:"Media coverage of rare violent crime events creates widespread public belief that crime is far more common than it is.",antidote:"Look for base rate data rather than media salience. Frequency in news ≠ frequency in reality.",realWorld:["Moral panics","Political polarization","Health scares"],keywords:["cascade","repetition","media"]},
    {id:77,cat:"hypothesis",name:"Cognitive Dissonance",tagline:"Contradictions must be resolved — often by distorting reality.",summary:"The mental discomfort of holding contradictory beliefs simultaneously, leading to motivated reasoning to reduce the tension.",example:"A smoker who knows smoking causes cancer rationalizes: 'I exercise a lot, so I'll be fine.'",antidote:"Notice when you're creating reasons to justify something rather than evaluating it. That's often dissonance resolution.",realWorld:["Addictive behavior","Political loyalty","Ethical self-justification"],keywords:["dissonance","contradiction","justification"]},
    {id:78,cat:"hypothesis",name:"Illusory Correlation",tagline:"Two things happened together — must be connected.",summary:"Perceiving a relationship between two unrelated variables — especially when we expect or want to find one.",example:"It rained every time you washed your car — so washing your car causes rain.",antidote:"Look for base rates. How often does X happen without Y? Without that, correlation is meaningless.",realWorld:["Superstitions","Vaccine-autism myths","Racial stereotyping"],keywords:["correlation","causation","superstition"]},
    {id:79,cat:"hypothesis",name:"Probability Matching",tagline:"You mirror the odds instead of exploiting them.",summary:"Matching response frequency to reward probability in uncertain environments rather than always choosing the statistically best option.",example:"Guessing 'heads' 60% of the time because heads appeared 60% — rather than always betting heads.",antidote:"Maximize expected value. If one option is better on average, choose it every time.",realWorld:["Gambling strategy","Animal foraging behavior","Human prediction tasks"],keywords:["probability","matching","optimization"]},
    {id:80,cat:"hypothesis",name:"Selection Bias",tagline:"The sample you see is not the sample that matters.",summary:"Drawing conclusions from a sample that is not representative of the population being studied.",example:"Judging neighborhood safety based only on experiences of people who have already moved away from it.",antidote:"Ask: who is in this sample, and who is missing? The absent data often matters most.",realWorld:["Survivorship bias in investing","Medical trial enrollment","Market research"],keywords:["sample","selection","representative"]},
    {id:81,cat:"hypothesis",name:"Salience Bias",tagline:"The dramatic drowns out the statistical.",summary:"Focusing on emotionally striking or prominent items and ignoring equally important but unremarkable information.",example:"Focusing on a single dramatic crime story rather than overall city statistics when assessing personal safety.",antidote:"Ask: is this information salient because it's important, or because it's vivid?",realWorld:["Risk assessment","News consumption","Policy priorities"],keywords:["salience","attention","drama"]},
    {id:82,cat:"hypothesis",name:"Truth Bias",tagline:"We assume honesty by default.",summary:"The inclination to believe that others are telling the truth regardless of whether they actually are — the default assumption is honesty.",example:"Most people perform barely above chance at detecting lies because we assume truth first.",antidote:"Distinguish trust from detection. You can trust someone while also checking their claims independently.",realWorld:["Fraud detection","Eyewitness credibility","Con artistry"],keywords:["truth","honesty","deception"]},
    {id:83,cat:"hypothesis",name:"Groupshift",tagline:"Groups drift toward extremes.",summary:"Groups making more extreme decisions than the average individual member — amplifying whatever direction the group already leans.",example:"A cautious group of investors becomes even more risk-averse after group discussion, beyond any individual's starting position.",antidote:"Have individuals commit to positions before group discussion. Compare post-discussion to pre-discussion to detect drift.",realWorld:["Committee decisions","Jury deliberation","Online communities"],keywords:["group","extreme","shift"]},
    {id:84,cat:"hypothesis",name:"Common Source Bias",tagline:"Multiple citations from the same flaw aren't multiple confirmations.",summary:"Treating studies from the same source, methodology, or dataset as independent evidence when they share the same underlying flaws.",example:"Citing five studies that all used the same flawed survey instrument as five independent confirmations.",antidote:"Ask: do these sources share a common methodology or data source? If so, they're not independent.",realWorld:["Academic literature reviews","Journalism","Policy analysis"],keywords:["source","independent","methodology"]},
    {id:85,cat:"hypothesis",name:"Quantification Bias",tagline:"What gets measured gets prioritized — even when it shouldn't.",summary:"Ascribing more weight to measured, quantifiable metrics than to equally important values that can't be easily measured.",example:"A hospital optimizes for measured metrics (wait times, readmission rates) while neglecting unmeasured care quality.",antidote:"Explicitly ask: what important things are we not measuring? Don't let the measurable crowd out the important.",realWorld:["Healthcare management","Education testing","Corporate performance reviews"],keywords:["measurement","metrics","priorities"]},
    {id:86,cat:"hypothesis",name:"Backfire Effect",tagline:"Corrections can strengthen false beliefs.",summary:"When firmly held beliefs are challenged with contradictory evidence, those beliefs can become stronger rather than updated.",example:"Correcting a false political belief sometimes causes the believer to hold it even more strongly afterward.",antidote:"Approach belief change as a slow process. Confrontational correction often backfires; affirm identity first.",realWorld:["Political persuasion","Anti-vaccination beliefs","Conspiracy theories"],keywords:["backfire","correction","beliefs"]},
    {id:87,cat:"hypothesis",name:"Clustering Illusion",tagline:"Random data looks anything but random.",summary:"The tendency to see meaningful patterns in random data — especially clusters and runs within sequences.",example:"Seeing a 'hot streak' in coin flips that are actually random — humans expect alternation but real randomness clusters.",antidote:"Simulate what random actually looks like. True randomness has clusters that feel non-random.",realWorld:["Sports statistics","Stock chart analysis","Quality control"],keywords:["pattern","random","clustering"]},
    {id:88,cat:"hypothesis",name:"False Priors",tagline:"Garbage in, garbage out — for beliefs too.",summary:"Initial incorrect beliefs interfering with unbiased evaluation of new factual evidence, leading to persistent incorrect conclusions.",example:"Prior belief that the Earth is flat causes misinterpretation of every subsequent piece of evidence for its spherical shape.",antidote:"Regularly examine your priors. Where did this belief come from? Is that source trustworthy?",realWorld:["Scientific progress","Political polarization","Medical diagnosis"],keywords:["priors","beliefs","evidence"]},

    {id:89,cat:"attribution",name:"Fundamental Attribution Error",tagline:"Their failure = their fault. My failure = circumstance.",summary:"Overemphasizing character and underestimating situational factors when judging others' behavior. When judging ourselves, we do the reverse.",example:"Someone cuts you off: they're a terrible driver. You cut someone off: you were in a rush.",antidote:"Before judging, ask: what invisible pressures might this person be under?",realWorld:["Workplace blame","Political judgments","Parenting judgments"],keywords:["attribution","character","situation"]},
    {id:90,cat:"attribution",name:"Self-Serving Bias",tagline:"Success is skill; failure is bad luck.",summary:"Attributing successes to internal factors like talent and intelligence, and failures to external factors like bad luck and circumstance.",example:"I passed the exam because I'm smart; I failed because the questions were unfair.",antidote:"Apply the same attribution standard to your successes that you apply to your failures. Both involve luck and skill.",realWorld:["Performance reviews","Sports analysis","Academic attribution"],keywords:["success","failure","attribution"]},
    {id:91,cat:"attribution",name:"In-Group Bias",tagline:"Us vs. them is a feature, not a bug — but it's costly.",summary:"Favouring members of one's own group over outsiders, evaluating their actions more charitably and attributing good outcomes to their character.",example:"Judging the exact same policy differently depending on which political party proposed it.",antidote:"Identify your tribe. Then deliberately read and engage with perspectives from outside it.",realWorld:["Political tribalism","Nepotism","Sports rivalries"],keywords:["ingroup","tribe","favoritism"]},
    {id:92,cat:"attribution",name:"Just-World Hypothesis",tagline:"People get what they deserve — we wish.",summary:"Believing the world is fundamentally fair and that people get what they deserve, leading to victim-blaming as a defense mechanism.",example:"'She must have done something to deserve it' — a response that protects the believer from feeling vulnerable.",antidote:"Separate 'what happened' from 'what was deserved.' Bad things happen to good people. That's not a comforting thought, but it's accurate.",realWorld:["Victim blaming","Poverty attribution","Health moralization"],keywords:["fairness","justice","victim"]},
    {id:93,cat:"attribution",name:"Halo Effect",tagline:"One good thing makes everything seem good.",summary:"A positive overall impression of a person in one domain influences opinions about their qualities in all other unrelated domains.",example:"An attractive speaker's ideas receive less critical scrutiny than identical ideas from someone unattractive.",antidote:"Evaluate traits independently. Would you still trust this argument if it came from someone you found annoying?",realWorld:["Job interviews","Celebrity endorsements","Teacher-student ratings"],keywords:["halo","impression","attraction"]},
    {id:94,cat:"attribution",name:"Horn Effect",tagline:"One bad thing makes everything seem bad.",summary:"The reverse of the halo effect — a single negative impression in one area colours all other perceptions negatively.",example:"Once someone makes a bad first impression, their subsequent good actions are interpreted with ongoing suspicion.",antidote:"Ask: am I evaluating this action or this person? Judge actions individually, not through a prior lens.",realWorld:["Performance management","Criminal justice","First impressions"],keywords:["horn","negative","impression"]},
    {id:95,cat:"attribution",name:"Outgroup Homogeneity Bias",tagline:"They all look the same. We are all different.",summary:"Seeing members of other groups as less varied and more uniform than members of one's own group.",example:"'They all look/think the same' — applied to any group the observer is not a member of.",antidote:"Learn individual stories from outgroups. Diversity within outgroups becomes visible through exposure.",realWorld:["Racial and cultural prejudice","Political 'bubbles'","Corporate monocultures"],keywords:["outgroup","homogeneity","diversity"]},
    {id:96,cat:"attribution",name:"Illusion of Control",tagline:"You have more control than you think — or less.",summary:"Overestimating one's influence over events that are actually largely or entirely determined by chance.",example:"Throwing dice gently for low numbers and hard for high numbers — as if physical effort affects the random outcome.",antidote:"Ask: what's my actual causal mechanism here? If you can't specify one, you may be imagining control.",realWorld:["Gambling","Superstitious rituals","Stock picking"],keywords:["control","influence","chance"]},
    {id:97,cat:"attribution",name:"Illusory Superiority",tagline:"We're all above average — which is impossible.",summary:"Overestimating one's own qualities relative to others — the Lake Wobegon effect where everyone believes they're above average.",example:"90% of drivers believe they are above-average drivers. Statistically impossible by definition.",antidote:"Seek objective feedback. Ask people who have nothing to gain from flattering you.",realWorld:["Driving skill","Intelligence estimates","Moral virtue assessments"],keywords:["superiority","average","self"]},
    {id:98,cat:"attribution",name:"False Consensus Effect",tagline:"You think more people agree with you than actually do.",summary:"Overestimating the degree to which others share your beliefs, values, and behaviors.",example:"'Surely most reasonable people agree with me on this' — a thought that precedes a great many arguments.",antidote:"Survey your social circle. Then adjust for the fact that it's not representative of everyone.",realWorld:["Political strategy","Product-market fit","Negotiation"],keywords:["consensus","agreement","opinion"]},
    {id:99,cat:"attribution",name:"Illusion of Transparency",tagline:"Your inner state is more visible than you think — and less.",summary:"Overestimating how well others can detect your internal emotional states, and how well you understand theirs.",example:"A nervous speaker thinks the audience can clearly see their anxiety, when in reality it's barely noticeable.",antidote:"Remember: your feelings are more visible to yourself than to others. Most people are focused on themselves.",realWorld:["Public speaking anxiety","Negotiation poker faces","Emotional labor"],keywords:["transparency","emotion","visibility"]},
    {id:100,cat:"attribution",name:"Spotlight Effect",tagline:"Nobody is watching you as closely as you think.",summary:"Overestimating how much others notice and remember one's appearance, mistakes, and behaviors.",example:"Spilling something on your shirt and assuming everyone in the room noticed and will remember it.",antidote:"Remember: everyone else is also the star of their own movie. You're background.",realWorld:["Social anxiety","Performance fear","Embarrassment over-estimation"],keywords:["spotlight","attention","anxiety"]},
    {id:101,cat:"attribution",name:"Extrinsic Incentives Bias",tagline:"I act from principle; you act for reward.",summary:"Viewing others as having situational extrinsic motivations while viewing oneself as having intrinsic, principled ones.",example:"'I volunteer because I care about the cause; they probably do it for the social recognition.'",antidote:"Apply the same charitable attribution to others that you use for yourself.",realWorld:["Workplace cynicism","Political attribution","Charity suspicion"],keywords:["incentives","motivation","principle"]},
    {id:102,cat:"attribution",name:"Naive Cynicism",tagline:"You expect more selfishness in others than actually exists.",summary:"Expecting more egocentric bias in others than in oneself — assuming others are more self-interested than they are.",example:"'Everyone else is out for themselves — I at least act with integrity and good faith.'",antidote:"Test the assumption. Most people's motivations are more mixed and prosocial than pure cynicism predicts.",realWorld:["Political trust","Negotiation","Organizational culture"],keywords:["cynicism","selfishness","trust"]},
    {id:103,cat:"attribution",name:"Naive Realism",tagline:"You see reality; others see their biases.",summary:"Believing one sees the world objectively, and that those who disagree are uninformed, biased, or irrational.",example:"'I just see things as they are — you're clearly letting your emotions cloud your judgment.'",antidote:"Consider that your perception is also filtered. What assumptions are baked into your 'objective' view?",realWorld:["Political disagreement","Scientific disputes","Personal relationships"],keywords:["realism","objectivity","perception"]},
    {id:104,cat:"attribution",name:"Actor-Observer Asymmetry",tagline:"I'm complex; you're predictable.",summary:"Attributing one's own behavior to situational factors but other people's behavior to their stable character traits.",example:"I'm late because of traffic; they're late because they're chronically irresponsible.",antidote:"When explaining your own behavior, ask: what character explanation could apply here? When explaining others': what situation might explain this?",realWorld:["Conflict resolution","Employee feedback","Cross-cultural misunderstanding"],keywords:["actor","observer","explanation"]},
    {id:105,cat:"attribution",name:"Belief Perseverance",tagline:"The original belief survives the death of its evidence.",summary:"Maintaining beliefs even after the evidence for them has been explicitly discredited.",example:"Someone continues to distrust a vaccine after multiple independent studies have been replicated and fully explained.",antidote:"Ask: if the original evidence hadn't existed, would I still hold this belief?",realWorld:["Anti-vaccine beliefs","Market bubble holding","Personal grudges"],keywords:["perseverance","evidence","discredited"]},
    {id:106,cat:"attribution",name:"Moral Luck",tagline:"Outcomes determine blame more than choices do.",summary:"Judging people more harshly for bad outcomes than for equally bad intentions or decisions that happened not to cause harm.",example:"Two drunk drivers: one gets home safely; one hits a pedestrian. The second is judged far more harshly — same moral choice.",antidote:"Evaluate the decision, not the outcome. Two identical choices deserve similar moral assessment.",realWorld:["Legal sentencing","Medical malpractice","Everyday blame"],keywords:["luck","outcome","blame"]},
    {id:107,cat:"attribution",name:"Defensive Attribution",tagline:"We blame victims less when we share their situation.",summary:"Attributing more blame to someone whose situation differs from one's own as a way of feeling protected from similar misfortune.",example:"Blaming accident victims who were driving — to reassure yourself it couldn't happen to you.",antidote:"Notice when your blame assignment shifts based on perceived similarity to yourself. That's the bias operating.",realWorld:["Accident victim blaming","Poverty attribution","Sexual harassment framing"],keywords:["defensive","victim","blame"]},
    {id:108,cat:"attribution",name:"Social Comparison Bias",tagline:"We hire people who won't outshine us.",summary:"When making decisions, favouring candidates who don't compete with one's own particular strengths.",example:"A hiring manager unconsciously rejects the most talented applicant because they'd outshine the manager's own specialty.",antidote:"Define criteria before seeing candidates. Evaluate against criteria, not against yourself.",realWorld:["Hiring","Academic admissions","Promotion decisions"],keywords:["comparison","hiring","competition"]},

    {id:109,cat:"memory",name:"Rosy Retrospection",tagline:"The past was better. (It probably wasn't.)",summary:"Remembering past events more positively than they were actually experienced. Negative emotions fade faster than positive ones.",example:'"High school was the best time of my life" — said by someone who was anxious and awkward for 4 years.',antidote:"Keep a journal. Present-you and future-you will remember things very differently.",realWorld:["Nostalgia marketing","Political 'golden ages'","Relationship reconciliation"],keywords:["nostalgia","past","memory"]},
    {id:110,cat:"memory",name:"Hindsight Bias",tagline:"After the fact, it all seems obvious.",summary:"After an event, believing you had predicted or could have predicted it — 'I knew it all along' — often called the 'knew-it-all-along effect.'",example:"After a market crash: 'The signs were so obvious; I should have acted on what I knew.'",antidote:"Record predictions before events. Hindsight rewrites the memory of foresight dramatically.",realWorld:["Investment post-mortems","Medical malpractice","Political forecasting"],keywords:["hindsight","prediction","obvious"]},
    {id:111,cat:"memory",name:"Baader-Meinhof Phenomenon",tagline:"Notice something once, and suddenly it's everywhere.",summary:"After learning about something for the first time, you start noticing it constantly — and wrongly conclude it has become more frequent. Your attention filter just switched on.",example:"You learn the word 'liminal' and then see it in three books, two podcasts, and a tweet within the same week.",antidote:"Ask: has this actually increased in frequency, or have I just updated my attention filter?",realWorld:["New car syndrome","Pregnancy conversations","Word frequency after learning"],keywords:["frequency","attention","noticing"]},
    {id:112,cat:"memory",name:"Misinformation Effect",tagline:"Post-event information rewrites the original memory.",summary:"Post-event information contaminates the memory of the original event, particularly in eyewitness testimony.",example:"Witnesses who heard 'the car smashed into the barrier' remember the crash as more severe than those who heard 'hit.'",antidote:"Preserve original memories before exposure to subsequent information. Write it down immediately.",realWorld:["Eyewitness testimony","Investigative interviewing","Customer recall studies"],keywords:["misinformation","memory","contamination"]},
    {id:113,cat:"memory",name:"Google Effect",tagline:"Why remember what you can just look up?",summary:"Forgetting information that can easily be retrieved externally — offloading memory to digital systems reduces actual encoding.",example:"Not bothering to remember directions because Google Maps is always accessible.",antidote:"Deliberately practice retention when the information matters. Offloaded knowledge is fragile knowledge.",realWorld:["Academic memory","Skill retention","Navigational ability"],keywords:["google","memory","offload"]},
    {id:114,cat:"memory",name:"Source Confusion",tagline:"You remember what — but not where.",summary:"Misattributing the origin of a memory — confusing the source of information with a different, often more personal source.",example:"Remembering a story as something that happened to you personally when you actually read it in a novel years ago.",antidote:"When recalling something important, trace the source actively. Where did I actually learn this?",realWorld:["Eyewitness testimony","Plagiarism","False memory syndrome"],keywords:["source","confusion","origin"]},
    {id:115,cat:"memory",name:"Cryptomnesia",tagline:"You think you invented it. You didn't.",summary:"Mistaking a forgotten memory for a new, original idea — the unconscious plagiarism of one's own memory.",example:"A songwriter 'composes' a melody that is actually a half-forgotten tune heard years earlier.",antidote:"When you have a 'new' idea, actively check whether you've encountered something similar before.",realWorld:["Artistic plagiarism","Patent disputes","Academic misconduct"],keywords:["cryptomnesia","plagiarism","original"]},
    {id:116,cat:"memory",name:"Von Restorff Effect",tagline:"What sticks out, sticks.",summary:"An item that stands out visually or conceptually from its surroundings is disproportionately well remembered compared to other items.",example:"The one red word in a black-and-white list is recalled first, most accurately, and most confidently.",antidote:"Design communications so that the most important element is the most distinctive. Use it deliberately.",realWorld:["Advertising design","Warning labels","Teaching and learning"],keywords:["distinctive","memory","attention"]},
    {id:117,cat:"memory",name:"Zeigarnik Effect",tagline:"Unfinished things haunt you.",summary:"Uncompleted or interrupted tasks are remembered better than completed ones — the mind keeps them 'open' until resolved.",example:"A waiter remembers every detail of an unpaid table's order but forgets it completely the moment the bill is settled.",antidote:"Use open loops deliberately in studying and work. Interruption can aid retention.",realWorld:["Study techniques","Cliffhangers in media","Task management"],keywords:["unfinished","tasks","memory"]},
    {id:118,cat:"memory",name:"Peak-End Rule",tagline:"How it ended matters more than how it averaged.",summary:"People judge experiences based primarily on how they felt at the most intense moment and at the end — not the average across the experience.",example:"A medical procedure with a painful climax but a gentler ending is remembered better than one that was uniformly painful.",antidote:"Design experiences with endings in mind. The final impression disproportionately defines the memory.",realWorld:["Customer experience design","Medical procedure planning","Service recovery"],keywords:["peak","end","experience"]},
    {id:119,cat:"memory",name:"Primacy Effect",tagline:"First impressions are sticky.",summary:"Items at the beginning of a list or sequence are remembered disproportionately well — the first items have time to be rehearsed.",example:"In a job interview panel, the first candidate is disproportionately well-remembered by the end of the day.",antidote:"In important contexts, go first or last. Avoid the middle.",realWorld:["Interview scheduling","Presentation order","Witness sequencing in court"],keywords:["primacy","first","order"]},
    {id:120,cat:"memory",name:"Recency Effect",tagline:"What happened last is remembered best.",summary:"The most recently encountered items are better recalled than earlier ones — the last items are still in active working memory.",example:"The last candidate interviewed is often rated most favourably because they're freshest in the evaluator's mind.",antidote:"Standardize evaluation immediately after each item, before the next one displaces it.",realWorld:["Performance evaluation","Jury decisions","Product comparisons"],keywords:["recency","last","memory"]},
    {id:121,cat:"memory",name:"Peak-End Rule",tagline:"Endings write the memory of the whole experience.",summary:"How an experience ends has a disproportionate effect on how the entire experience is remembered — even more than duration.",example:"A painful medical procedure remembered as better than a shorter one, simply because the pain eased at the end.",antidote:"When designing experiences, invest heavily in finales. The last moment writes the memory.",realWorld:["Customer service","Product design","Event planning"],keywords:["ending","memory","duration"]},
    {id:122,cat:"memory",name:"Duration Neglect",tagline:"How long doesn't matter much to memory.",summary:"The overall duration of an experience has little effect on how it is evaluated or remembered — the peak and end dominate.",example:"A two-hour pleasant vacation and a two-week pleasant vacation produce similar satisfaction memories.",antidote:"When evaluating remembered experiences, check whether you're accounting for duration. Memory underweights it.",realWorld:["Medical treatment evaluation","Vacation planning","Entertainment"],keywords:["duration","neglect","experience"]},
    {id:123,cat:"memory",name:"Telescoping Effect",tagline:"Recent things feel farther; distant things feel closer.",summary:"Perceiving recent events as farther in the past than they are (forward telescoping) or distant events as more recent (backward telescoping).",example:"An event from 5 years ago feels like it was just last year; last month's event feels like it was ages ago.",antidote:"Use calendars and dates to anchor temporal reasoning. Intuitive time-sense is unreliable.",realWorld:["Legal testimony","Survey methodology","Personal nostalgia"],keywords:["telescoping","time","perception"]},
    {id:124,cat:"memory",name:"Fading Affect Bias",tagline:"Bad feelings fade faster than good ones.",summary:"Negative emotions associated with memories fade more quickly than positive ones, distorting the emotional archive toward positivity over time.",example:"The embarrassment from a social blunder fades; the warm glow of a kind gesture lingers for years.",antidote:"Journal about both positive and negative experiences at the time. Memory will distort both, but in different directions.",realWorld:["Relationship memory","Post-conflict reconciliation","Brand memory"],keywords:["fading","emotion","memory"]},
    {id:125,cat:"memory",name:"Spacing Effect",tagline:"Spread it out to make it stick.",summary:"Information is far better retained when learning is spaced over time rather than concentrated in a single session.",example:"Studying 30 minutes per day for a week produces dramatically better long-term retention than cramming 3.5 hours the night before.",antidote:"Use spaced repetition software. Schedule review sessions rather than relying on mass practice.",realWorld:["Language learning","Medical education","Professional training"],keywords:["spacing","learning","retention"]},
    {id:126,cat:"memory",name:"Serial Position Effect",tagline:"Beginnings and endings win; middles are forgotten.",summary:"The combined effect of primacy and recency — items at the beginning and end of a list are recalled much better than middle items.",example:"Middle items in a presentation slide are consistently least remembered by any audience.",antidote:"Place critical information first or last. Never bury the most important point in the middle.",realWorld:["Presentation design","Menu design","Teaching structure"],keywords:["serial","position","order"]},
    {id:127,cat:"memory",name:"Choice-Supportive Bias",tagline:"Once you've chosen, you remember the choice as better than it was.",summary:"Retrospectively attributing more positive qualities to chosen options and negative ones to unchosen alternatives — post-hoc rationalization.",example:"After buying a car, remembering its virtues vividly and conveniently forgetting the drawbacks that worried you at the time.",antidote:"Before deciding, write down the cons of your preferred option and the pros of alternatives. Your future memory will suppress these.",realWorld:["Consumer purchases","Career decisions","Relationship choices"],keywords:["choice","memory","rationalization"]},
    {id:128,cat:"memory",name:"Illusion of Knowing",tagline:"Recognition feels like knowledge.",summary:"Feeling confident that one understands or could recall something without actually being able to — familiarity substitutes for genuine comprehension.",example:"Feeling confident about a topic after reading an article, then failing to explain it to someone else in any depth.",antidote:"Test recall, not recognition. Retrieval practice reveals the gap between feeling-of-knowing and actual knowledge.",realWorld:["Studying","Professional expertise claims","Witness confidence"],keywords:["knowing","recognition","comprehension"]},
    {id:129,cat:"memory",name:"Bizarreness Effect",tagline:"Weird things stick better than normal things.",summary:"Bizarre, unusual, or incongruous material is remembered better than common, ordinary material — the brain flags the unusual.",example:"You remember the one bizarre item in a list far better than all the mundane ones surrounding it.",antidote:"Use unexpected analogies and weird examples when teaching. Bizarreness aids encoding.",realWorld:["Memory techniques","Advertising","Teaching"],keywords:["bizarre","unusual","memory"]},
    {id:130,cat:"memory",name:"Rosy Prospection",tagline:"Future you seems to live somewhere rosier.",summary:"Expecting the future to be more positive than it will likely be — future positive events feel even brighter than past ones feel in retrospect.",example:"People consistently overestimate how happy they'll be on their next vacation or after the next life milestone.",antidote:"Apply the same sober hindsight you use for the past to your future projections.",realWorld:["Vacation planning","Major purchase anticipation","Goal-setting"],keywords:["prospection","future","optimism"]},

    {id:131,cat:"social",name:"Bandwagon Effect",tagline:"50 million people can't be wrong… can they?",summary:"Adopting beliefs, behaviors, and trends because others do — popularity becomes evidence of correctness in our minds.",example:"Buying a stock because everyone is talking about it, not because of its underlying fundamentals.",antidote:"Ask: would I believe or do this if I were the only one? What's my independent reason?",realWorld:["Fad diets","Stock bubbles","Voting behavior"],keywords:["bandwagon","popularity","trends"]},
    {id:132,cat:"social",name:"Blind Spot Bias",tagline:"You see everyone else's biases clearly — except your own.",summary:"Recognizing cognitive biases in others much more readily than in oneself — the meta-bias that protects all other biases.",example:'"I judge things objectively; it\'s other people who let emotions get in the way."',antidote:"The fact that you don't feel biased is not evidence that you aren't. Look for structural checks, not introspection.",realWorld:["Overconfident experts","Partisan media consumption","Self-assessments"],keywords:["blind spot","self","meta"]},
    {id:133,cat:"social",name:"Curse of Knowledge",tagline:"Once you know something, you can't imagine not knowing it.",summary:"Once we know something, we find it nearly impossible to imagine what it was like not to know it — making experts poor communicators.",example:"The expert explains everything in jargon and is baffled when beginners don't immediately understand.",antidote:"Use the '5-year-old test.' Can you explain it simply? If not, your understanding may be shallower than you think.",realWorld:["Teaching","Product design","Technical writing"],keywords:["curse","knowledge","communication"]},
    {id:134,cat:"social",name:"Cheerleader Effect",tagline:"Everyone looks more attractive in a group.",summary:"People appear more attractive when seen as part of a group than in isolation — the brain averages faces and the average is flattering.",example:"A mediocre photo of a person surrounded by attractive friends is rated higher than a solo shot of the same person.",antidote:"Evaluate individuals individually. Group attractiveness averages can mislead assessment of the individual.",realWorld:["Dating profiles","Hiring panels","Brand association"],keywords:["cheerleader","group","attractive"]},
    {id:135,cat:"social",name:"Social Loafing",tagline:"In a group, everyone assumes someone else is pulling their weight.",summary:"Individuals exert less effort when working in a group than when working alone — diffused responsibility reduces personal accountability.",example:"Group projects consistently underperform the sum of individual contributions due to effort reduction.",antidote:"Assign individual accountability within group tasks. Make each person's contribution visible.",realWorld:["Team projects","Group assignments","Organizational committees"],keywords:["loafing","group","effort"]},
    {id:136,cat:"social",name:"Conformity Bias",tagline:"Wrong answers feel right when the group gives them.",summary:"Changing one's own behavior to match others in a group, even when doing so contradicts private judgment and clearly available evidence.",example:"In Asch conformity experiments, people agreed with obviously wrong answers just to fit the group.",antidote:"Commit to your private judgment before hearing others'. Separate private judgment from social expression.",realWorld:["Boardroom decisions","Jury deliberations","Academic peer pressure"],keywords:["conformity","group","pressure"]},
    {id:137,cat:"social",name:"Pygmalion Effect",tagline:"Expectations become reality.",summary:"Higher expectations of a person lead to better actual performance — a positive self-fulfilling prophecy driven by changed behavior and communication.",example:"Students told their teacher believes in them strongly perform significantly better, regardless of prior measured ability.",antidote:"Examine and raise your expectations of others. The beliefs you hold about people shape how you treat them and what they become.",realWorld:["Education","Management","Coaching"],keywords:["pygmalion","expectations","performance"]},
    {id:138,cat:"social",name:"Golem Effect",tagline:"Low expectations become low performance.",summary:"Lower expectations lead to worse performance — the negative version of the Pygmalion effect, caused by reduced support and encouragement.",example:"Employees whose managers expect little tend to underperform, even when they are objectively capable.",antidote:"Monitor your own expectations for signs of pessimism about people. They often pick it up and live down to it.",realWorld:["Management","Special education","Mentorship"],keywords:["golem","expectations","performance"]},
    {id:139,cat:"social",name:"Not Invented Here",tagline:"If we didn't build it, we don't trust it.",summary:"Aversion to using products, ideas, or knowledge developed outside one's own group — even when external solutions are clearly superior.",example:"A tech company refuses to use well-tested third-party tools and rewrites everything from scratch, at enormous cost.",antidote:"Evaluate solutions on merit, not origin. Ask: would we trust this if our team had built it?",realWorld:["Software development","Academic research","Corporate strategy"],keywords:["not invented","external","trust"]},
    {id:140,cat:"social",name:"Reactance Bias",tagline:"Tell someone they can't, and they want to even more.",summary:"Valuing freedom and autonomy so strongly that restrictions produce the exact opposite of their intended effect.",example:"'Parental Advisory' warning labels on explicit albums caused sales to increase — the forbidden became desirable.",antidote:"Offer choices and autonomy rather than restrictions. Framing as enabling rather than prohibiting changes compliance.",realWorld:["Parenting","Public health messaging","Marketing"],keywords:["reactance","restriction","autonomy"]},
    {id:141,cat:"social",name:"Plan Continuation Bias",tagline:"We keep flying into storms we should have turned from.",summary:"Failure to recognize that the original plan of action is no longer appropriate for a changed situation — commitment to the plan overrides updated information.",example:"Pilots continuing a landing approach despite deteriorating conditions rather than executing a go-around.",antidote:"Build in explicit 'check and revise' moments. Ask: if we were starting this plan today, knowing what we now know, would we proceed?",realWorld:["Aviation safety","Military strategy","Project management"],keywords:["plan","continuation","commitment"]},
    {id:142,cat:"social",name:"System Justification",tagline:"We defend the systems that disadvantage us.",summary:"The tendency to defend and bolster the status quo as fair and legitimate — even at the expense of personal and group interests.",example:"Disadvantaged groups sometimes defend the very systems and hierarchies that systematically disadvantage them.",antidote:"Distinguish between 'this system exists' and 'this system is fair.' Existence doesn't imply fairness.",realWorld:["Political conservatism","Workplace hierarchy","Economic inequality"],keywords:["system","justification","status quo"]},
    {id:143,cat:"social",name:"Third-Person Effect",tagline:"Media affects everyone except me.",summary:"Believing that media and communications have a greater effect on others than on oneself — we see others as more susceptible.",example:'"Advertising doesn\'t really affect me — but I can clearly see it manipulating other people."',antidote:"If you believe you are uniquely immune to influence, that's a red flag. The bias works by hiding itself.",realWorld:["Media literacy","Advertising research","Propaganda analysis"],keywords:["third person","media","influence"]},
    {id:144,cat:"social",name:"Reciprocity Norm",tagline:"A free gift is never really free.",summary:"Feeling obligated to return favors even when completely unsolicited — a powerful social norm widely exploited in sales and marketing.",example:"Free supermarket samples lead to significantly higher purchase rates due to the felt obligation to reciprocate.",antidote:"Recognize that accepting small gifts creates felt obligation. You are allowed to accept and still say no.",realWorld:["Sales tactics","Political fundraising","Social manipulation"],keywords:["reciprocity","gift","obligation"]},
    {id:145,cat:"social",name:"Social Proof",tagline:"If everyone is doing it, it must be right.",summary:"Looking to others' behavior to determine the correct course of action in ambiguous situations — a reasonable shortcut that gets systematically exploited.",example:"A restaurant with a long queue must be better than an empty one — other people must know something we don't.",antidote:"Ask: are these people actually informed, or are they just following each other?",realWorld:["Product reviews","Crowd behavior","Investment bubbles"],keywords:["social proof","crowd","behavior"]},
    {id:146,cat:"social",name:"Scarcity Heuristic",tagline:"Rare means valuable.",summary:"Valuing things more when they are rare or becoming unavailable — regardless of intrinsic worth. Scarcity signals value heuristically.",example:"'Limited time offer!' creates urgency that bypasses rational evaluation of whether the product is actually needed.",antidote:"Ask: would I want this as much if it were always available? Separate scarcity from genuine value.",realWorld:["Retail marketing","Auction dynamics","Luxury goods"],keywords:["scarcity","rare","value"]},
    {id:147,cat:"social",name:"Liking Bias",tagline:"Charming people are more persuasive than right ones.",summary:"Being more easily persuaded by people we like — regardless of the quality of their argument or the accuracy of their claims.",example:"Salespeople who find common ground and mirror body language close significantly more deals, independent of product quality.",antidote:"Separate your evaluation of the person from your evaluation of their argument. Like them AND scrutinize them.",realWorld:["Sales","Political campaigning","Cult dynamics"],keywords:["liking","persuasion","charm"]},
    {id:148,cat:"social",name:"Bystander Effect",tagline:"When everyone is responsible, no one is.",summary:"Individuals are less likely to help in an emergency when others are present — responsibility diffuses across the group and everyone waits for someone else.",example:"Kitty Genovese case: 38 witnesses, none called police for over 30 minutes, each assuming someone else had already done so.",antidote:"In emergencies, designate a specific person. 'You, in the blue jacket — call 911' breaks diffusion of responsibility.",realWorld:["Emergency response","Organizational accountability","Online harassment"],keywords:["bystander","emergency","responsibility"]},
    {id:149,cat:"social",name:"False Uniqueness Effect",tagline:"You think your good qualities are rarer than they are.",summary:"Believing one's positive attributes and behaviors are much rarer or more exceptional than they actually are.",example:"A person overestimates how unusual it is that they both care about the environment and enjoy cooking.",antidote:"Survey your peers. Your constellation of virtues is likely more common than it feels.",realWorld:["Startup founder overconfidence","Moral superiority claims","Social comparison"],keywords:["uniqueness","rare","exceptional"]},
    {id:150,cat:"social",name:"Cross-Race Effect",tagline:"We recognize our own group's faces better.",summary:"Being more accurate at recognizing faces of one's own racial or ethnic group than faces of other groups.",example:"Eyewitness misidentification across racial lines is one of the most documented causes of wrongful conviction.",antidote:"Awareness alone helps. In high-stakes identifications, this bias demands structural safeguards.",realWorld:["Criminal justice","Eyewitness testimony","Security screening"],keywords:["cross race","faces","recognition"]},
    {id:151,cat:"social",name:"Herd Behavior",tagline:"Crowds create their own momentum.",summary:"Individuals acting collectively without centralized direction, following the crowd in ways that create collective irrationality and market dynamics.",example:"The dot-com bubble and 2008 housing crisis were driven by herd investing overriding individual analysis.",antidote:"Make independent assessments before observing what others are doing. Commit before you look at the crowd.",realWorld:["Financial markets","Fashion cycles","Political movements"],keywords:["herd","crowd","momentum"]},
    {id:152,cat:"social",name:"Overconfidence Effect",tagline:"You know less than you think.",summary:"Excessive confidence in one's own judgments and answers — especially on questions of medium difficulty where calibration is worst.",example:"90%-confident answers are correct only ~75% of the time in calibration studies with experts.",antidote:"Track prediction accuracy over time. Systematic overconfidence is invisible without a track record.",realWorld:["Forecasting","Medical diagnosis","Legal strategy"],keywords:["overconfidence","calibration","prediction"]},
    {id:153,cat:"social",name:"Hot-Cold Empathy Gap",tagline:"When you're cool, you underestimate how hot states change you.",summary:"Underestimating the influence of visceral drives — hunger, pain, desire, fear — on one's attitudes and behavior when in a different state.",example:"People plan detailed gym routines on full stomachs that they completely abandon when tired and hungry.",antidote:"Make important decisions when you're in a representative state. Avoid deciding while hungry, exhausted, or emotionally flooded.",realWorld:["Health planning","Addiction recovery","Impulse control"],keywords:["empathy gap","hunger","states"]},
    {id:154,cat:"social",name:"Stereotyping",tagline:"The category becomes the individual.",summary:"Expecting members of a group to have certain characteristics without accounting for the enormous variation within all human groups.",example:"Assuming a software engineer won't be interested in poetry, or that a poet won't understand probability.",antidote:"Encounter individuals. Stereotypes are statistical generalizations applied to people who are not statistics.",realWorld:["Hiring","Education","Criminal justice"],keywords:["stereotype","category","individual"]},
    {id:155,cat:"social",name:"Moral Disengagement",tagline:"We use cognitive tools to switch off our moral compass.",summary:"Using psychological mechanisms to disengage normal moral self-regulation, allowing oneself to act in ways that would otherwise violate personal standards.",example:"Soldiers told enemies are 'subhuman' find it easier to act violently than those who see them as people.",antidote:"Notice the language used to justify unusual actions. Dehumanization and euphemism are early warning signs.",realWorld:["Military ethics","Corporate wrongdoing","Everyday ethical failures"],keywords:["moral","disengagement","ethics"]},
    {id:156,cat:"social",name:"Majority Illusion",tagline:"Your social bubble makes minority views feel mainstream.",summary:"Overestimating how widespread a behavior or belief is in the broader population based on what one sees in one's own social network.",example:"Because most of your connected friends smoke, you believe most people in your city smoke — they don't.",antidote:"Actively seek outside-network data. Your network is a deeply unrepresentative sample of the broader world.",realWorld:["Political opinion","Social norms","Health behavior"],keywords:["majority","illusion","network"]},
    {id:157,cat:"social",name:"False Memory",tagline:"Memory is reconstruction, not recording.",summary:"Developing highly confident but entirely false memories — events that never occurred can feel as vivid and certain as real ones.",example:"Researchers reliably implanted false memories of being lost in a shopping mall as a child in study participants.",antidote:"Treat confident memories as hypotheses, not facts. Verify before acting on them.",realWorld:["Eyewitness testimony","Therapy and suggestion","Personal relationship conflicts"],keywords:["false memory","reconstruction","implant"]},
    {id:158,cat:"social",name:"IKEA Effect (Social)",tagline:"You love what you built, regardless of how it turned out.",summary:"Placing disproportionately high value on objects one partially created, regardless of the objective quality of the output.",example:"People rate their homemade origami as nearly as beautiful as expert origami — and pay more for their own.",antidote:"Seek outside evaluation. Your effort invested is not evidence of quality produced.",realWorld:["Product development","Startup valuation","Creative work"],keywords:["ikea","effort","creation"]},
    {id:159,cat:"social",name:"Herding Instinct",tagline:"Crowds create momentum that individuals can't resist.",summary:"Following the crowd in markets and social contexts, creating collective dynamics that override individual rational judgment.",example:"The dot-com bubble and 2008 housing crisis were driven by herd dynamics where individual skepticism was overwhelmed.",antidote:"Before acting, ask: am I doing this because of independent analysis, or because everyone else is?",realWorld:["Financial markets","Fashion","Political movements"],keywords:["herding","instinct","crowd"]},
    {id:160,cat:"social",name:"Self-Handicapping",tagline:"Create the excuse before you need it.",summary:"Creating obstacles for oneself before a performance to provide a ready explanation for potential failure, protecting self-image.",example:"Not studying before an exam so you can blame the result on lack of effort rather than lack of ability.",antidote:"Notice when you're engineering excuses in advance. What are you afraid of finding out about yourself?",realWorld:["Academic performance","Athletic competition","Career risk-taking"],keywords:["self-handicapping","excuse","failure"]},
    {id:161,cat:"social",name:"Communication Bias",tagline:"The expert's curse: fluency without comprehension.",summary:"Experts systematically overestimating their audience's baseline knowledge, leading to communication that educates no one.",example:"A physicist explaining quantum mechanics to a curious non-scientist skips the foundational steps that make it comprehensible.",antidote:"Start further back than you think necessary. Your audience knows far less about your domain than you unconsciously assume.",realWorld:["Technical documentation","Science communication","Expert testimony"],keywords:["communication","expert","audience"]},
    {id:162,cat:"social",name:"Positivity Effect",tagline:"Older people see the world through a warmer lens.",summary:"Older adults focus more on positive memories and information and less on negative content compared to younger adults.",example:"Despite more health challenges and losses, older people report higher average life satisfaction than younger people.",antidote:"Recognize that this shift in attention may be adaptive — but it can also mean underweighting real risks.",realWorld:["Elder care","Intergenerational communication","Age-related risk perception"],keywords:["positivity","aging","attention"]},
    {id:163,cat:"social",name:"Ingroup Favoritism",tagline:"Same resume, different rating — depending on the tribe.",summary:"Giving preferential treatment to members of one's own group over outsiders, without objective justification.",example:"Hiring managers rate resumes from candidates who share their university significantly more favorably — same qualifications.",antidote:"Blind review processes. Remove group markers before evaluation where possible.",realWorld:["Hiring","Academic admissions","Political alliances"],keywords:["ingroup","favoritism","bias"]},
    {id:164,cat:"social",name:"False Consensus (Social)",tagline:"Most people agree with me — I think.",summary:"Overestimating how widely your own views and behaviors are shared among the general population.",example:"People who prefer action movies estimate that a large majority of others also prefer action movies.",antidote:"Survey. Then adjust for the fact that your social environment is not representative of humanity.",realWorld:["Political strategy","Product development","Policy design"],keywords:["consensus","agreement","overestimate"]},
    {id:165,cat:"social",name:"In-Group Echo Chamber",tagline:"The bubble amplifies what you already believe.",summary:"Information environments that reinforce existing beliefs and exclude challenging perspectives, creating a feedback loop of confirmation.",example:"A person who only follows like-minded accounts believes their political view is mainstream and the opposition is extreme.",antidote:"Deliberately follow and read high-quality sources that disagree with your current views.",realWorld:["Social media algorithms","Political polarization","Religious communities"],keywords:["echo chamber","bubble","reinforcement"]}
  ];

  let currentFilter = 'all';
  let currentSearch = '';
  let expandedId = null;

  function getStorage(key, fallback = []) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : fallback;
    } catch { return fallback; }
  }

  function setStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function getReadIds() { return getStorage(STORAGE_KEYS.READ, []); }
  function setReadIds(ids) { setStorage(STORAGE_KEYS.READ, ids); }

  function getNotes() { return getStorage(STORAGE_KEYS.NOTES, {}); }
  function setNotes(notes) { setStorage(STORAGE_KEYS.NOTES, notes); }

  function getStreak() {
    const lastVisit = getStorage(STORAGE_KEYS.LAST_VISIT, null);
    const streak = getStorage(STORAGE_KEYS.STREAK, 0);
    const today = new Date().toDateString();
    
    if (lastVisit === today) return streak;
    
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    if (lastVisit === yesterday) {
      setStorage(STORAGE_KEYS.STREAK, streak + 1);
      setStorage(STORAGE_KEYS.LAST_VISIT, today);
      return streak + 1;
    }
    
    setStorage(STORAGE_KEYS.STREAK, 1);
    setStorage(STORAGE_KEYS.LAST_VISIT, today);
    return 1;
  }

  function toggleRead(id, e) {
    if (e && typeof e.stopPropagation === 'function') {
      e.stopPropagation();
    }
    const readIds = getReadIds();
    const idx = readIds.indexOf(id);
    if (idx > -1) readIds.splice(idx, 1);
    else readIds.push(id);
    setReadIds(readIds);
    render();
    updateProgress();
    renderAchievements();
  }

  function getFiltered() {
    const readIds = getReadIds();
    return biases.filter(b => {
      let matchCat = currentFilter === 'all' || b.cat === currentFilter;
      if (currentFilter === 'read') matchCat = readIds.includes(b.id);
      if (currentFilter === 'unread') matchCat = !readIds.includes(b.id);
      const q = currentSearch.toLowerCase();
      const matchSearch = !q || 
        b.name.toLowerCase().includes(q) || 
        b.summary.toLowerCase().includes(q) ||
        (b.keywords && b.keywords.some(k => k.includes(q)));
      return matchCat && matchSearch;
    });
  }

  function getRelated(bias, limit = 3) {
    const sameCat = biases.filter(b => b.cat === bias.cat && b.id !== bias.id);
    return sameCat.slice(0, limit);
  }

  function copyTextToClipboard(text, successMessage) {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text)
        .then(() => showToast(successMessage))
        .catch(() => showToast('Unable to copy automatically'));
      return;
    }

    const temp = document.createElement('textarea');
    temp.value = text;
    temp.setAttribute('readonly', '');
    temp.style.position = 'absolute';
    temp.style.left = '-9999px';
    document.body.appendChild(temp);
    temp.select();
    temp.setSelectionRange(0, temp.value.length);

    try {
      const copied = document.execCommand('copy');
      showToast(copied ? successMessage : 'Unable to copy automatically');
    } catch {
      showToast('Unable to copy automatically');
    } finally {
      temp.remove();
    }
  }

  function copyLink(id) {
    const url = new URL(window.location.href);
    url.searchParams.set('id', id);
    copyTextToClipboard(url.toString(), 'Link copied!');
  }

  function shareBias(bias) {
    const text = `"${bias.tagline}"\n\n${bias.name}: ${bias.summary}\n\n— Cognitive Biases Field Guide`;
    copyTextToClipboard(text, 'Quote copied to clipboard!');
  }

  function showToast(msg) {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();
    
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = msg;
    toast.style.cssText = 'position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:var(--ink);color:var(--paper);padding:10px 20px;border-radius:4px;font-size:0.75rem;z-index:9999;animation:fadeIn 0.3s ease';
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
  }

  function getRandomUnread() {
    const readIds = getReadIds();
    const unread = biases.filter(b => !readIds.includes(b.id));
    if (unread.length === 0) return biases[Math.floor(Math.random() * biases.length)];
    return unread[Math.floor(Math.random() * unread.length)];
  }

  function surpriseMe() {
    const bias = getRandomUnread();
    currentFilter = 'all';
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    document.querySelector('.filter-btn[data-cat="all"]').classList.add('active');
    render();
    setTimeout(() => {
      const card = document.querySelector(`.card[data-id="${bias.id}"]`);
      if (card) card.scrollIntoView({ behavior: 'smooth', block: 'center' });
      openCardModal(bias.id);
    }, 100);
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  function cardHTML(b, isExpanded, animDelay, isRead) {
    const color = CAT_COLORS[b.cat] || '#7a6e5e';
    
    return `
      <div class="card animate-in ${isRead ? 'read' : ''}"
           data-id="${b.id}"
           style="--card-accent:${color}; animation-delay:${animDelay}s"
           onclick="window.CognitiveBiases.toggleCard(${b.id})">
        <div class="card-number">${String(b.id).padStart(3,'0')}</div>
        ${isRead ? '<div class="card-read-indicator"><i class="fa-solid fa-check" aria-hidden="true"></i></div>' : ''}
        <div class="card-category">${b.cat}</div>
        <h2>${b.name}</h2>
        ${b.tagline ? `<p class="card-tagline">"${b.tagline}"</p>` : ''}
        <p class="card-summary">${b.summary}</p>
        <p class="expand-hint">Open details</p>
      </div>`;
  }

  function getBias(id) {
    return biases.find(b => b.id === id);
  }

  function render() {
    const filtered = getFiltered();
    const grid = document.getElementById('grid');
    const stats = document.getElementById('statsBar');
    const isListView = document.body.classList.contains('list-view');
    const readIds = getReadIds();

    stats.textContent = `Showing ${filtered.length} of ${biases.length} biases · ${readIds.length} read — click any card for details`;

    if (filtered.length === 0) {
      grid.innerHTML = '<div class="no-results">No biases match. Try a different search or filter.</div>';
      return;
    }

    const getDelay = (i) => isListView ? 0 : Math.min(i * 0.025, 0.5);
    grid.innerHTML = filtered.map((b, i) => cardHTML(b, expandedId === b.id, getDelay(i), readIds.includes(b.id))).join('');
  }

  function scrollToCard(id) {
    setTimeout(() => {
      const card = document.querySelector(`.card[data-id="${id}"]`);
      if (card) {
        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      openCardModal(id);
    }, 100);
  }

  function closeCardModal(skipHistory = false) {
    const modal = document.querySelector('.bias-detail-modal');
    if (modal) modal.remove();
    expandedId = null;
    if (!skipHistory) {
      history.pushState(null, '', window.location.pathname);
    }
  }

  function openCardModal(id, options = {}) {
    const bias = getBias(id);
    if (!bias) return;

    const opts = options || {};
    const isRead = getReadIds().includes(id);
    const related = getRelated(bias);
    const notes = getNotes();
    const userNote = escapeHtml(notes[id] || '');

    const existing = document.querySelector('.bias-detail-modal');
    if (existing) existing.remove();

    const modal = document.createElement('div');
    modal.className = 'bias-detail-modal';
    modal.innerHTML = `
      <div class="bias-detail-content">
        <button class="close-modal" aria-label="Close details">&times;</button>
        <div class="card-category">${bias.cat}</div>
        <h2 class="bias-detail-title">${bias.name}</h2>
        ${bias.tagline ? `<p class="card-tagline">"${bias.tagline}"</p>` : ''}
        <p class="card-summary">${bias.summary}</p>
        <div class="card-extra">
          ${bias.example ? `<h3>Real-world example</h3><div class="example-box">${bias.example}</div>` : ''}
          ${bias.antidote ? `<h3>Antidote</h3><p>${bias.antidote}</p>` : ''}
          ${bias.realWorld && bias.realWorld.length ? `<h3>Where it shows up</h3><ul>${bias.realWorld.map(r => `<li>${r}</li>`).join('')}</ul>` : ''}
          ${related.length ? `<h3>Related biases</h3><div class="related-biases">${related.map(r => `<span class="related-tag" data-related-id="${r.id}">${r.name}</span>`).join('')}</div>` : ''}
          <div class="notes-section">
            <h3>Your notes</h3>
            <textarea class="notes-textarea" placeholder="Add your personal notes...">${userNote}</textarea>
            <p class="notes-storage-hint">Stored locally in this browser on this device.</p>
          </div>
          <div class="card-actions">
            <button class="action-btn" data-action="toggle-read">${isRead ? '<i class="fa-solid fa-check icon-inline" aria-hidden="true"></i>Mark unread' : '<i class="fa-regular fa-circle icon-inline" aria-hidden="true"></i>Mark as read'}</button>
            <button class="action-btn" data-action="copy-link"><i class="fa-solid fa-link icon-inline" aria-hidden="true"></i>Copy link</button>
            <button class="action-btn" data-action="share"><i class="fa-solid fa-share-nodes icon-inline" aria-hidden="true"></i>Share quote</button>
          </div>
        </div>
      </div>
    `;

    modal.querySelector('.close-modal').addEventListener('click', () => closeCardModal());
    modal.addEventListener('click', (event) => {
      if (event.target === modal) closeCardModal();
    });

    const noteEl = modal.querySelector('.notes-textarea');
    if (noteEl) {
      noteEl.addEventListener('click', (event) => event.stopPropagation());
      noteEl.addEventListener('input', (event) => {
        saveNote(id, event.target.value);
      });
    }

    const readBtn = modal.querySelector('[data-action="toggle-read"]');
    if (readBtn) {
      readBtn.addEventListener('click', () => {
        toggleRead(id);
        openCardModal(id, { skipHistory: true });
      });
    }

    const copyBtn = modal.querySelector('[data-action="copy-link"]');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => copyLink(id));
    }

    const shareBtn = modal.querySelector('[data-action="share"]');
    if (shareBtn) {
      shareBtn.addEventListener('click', () => shareBias(bias));
    }

    modal.querySelectorAll('[data-related-id]').forEach((el) => {
      el.addEventListener('click', () => {
        const relatedId = parseInt(el.dataset.relatedId, 10);
        if (relatedId) openCardModal(relatedId);
      });
    });

    document.body.appendChild(modal);
    expandedId = id;

    if (!opts.skipHistory) {
      history.pushState(null, '', `?id=${id}`);
    }
  }

  function toggleCard(id) {
    openCardModal(id);
  }

  function updateProgress() {
    const readIds = getReadIds();
    const count = readIds.length;
    const total = biases.length;
    const pct = Math.round((count / total) * 100);
    const streak = getStreak();
    
    const progressEl = document.getElementById('progressBar');
    if (progressEl) {
      progressEl.innerHTML = `
        <div class="progress-stats">
          <span><strong>${count}</strong>/${total} mastered</span>
          <span>${pct}%</span>
          ${streak > 1 ? `<span class="streak"><i class="fa-solid fa-fire icon-inline" aria-hidden="true"></i>${streak} day streak</span>` : ''}
        </div>
        <div class="progress-track">
          <div class="progress-fill" style="width:${pct}%"></div>
        </div>
      `;
    }
  }

  function handleDeepLink() {
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get('id'), 10);
    if (id && biases.find(b => b.id === id)) {
      return id;
    }
    return null;
  }

  function showBiasModal(bias, isShared = false) {
    const modal = document.createElement('div');
    modal.className = 'daily-modal';
    modal.innerHTML = `
      <div class="daily-content">
        <div class="daily-label">${isShared ? 'Shared Bias' : 'Bias of the Day'}</div>
        <h2>${bias.name}</h2>
        <p class="daily-tagline">"${bias.tagline}"</p>
        <p class="daily-summary">${bias.summary}</p>
        ${bias.example ? `<div class="example-box" style="margin:16px 0;font-size:0.8rem;">${bias.example}</div>` : ''}
        <div class="daily-actions">
          <button class="daily-btn" onclick="this.closest('.daily-modal').remove()">Explore</button>
          <button class="daily-btn secondary" onclick="const modal=this.closest('.daily-modal');modal.remove();setTimeout(()=>{window.CognitiveBiases.scrollToCard(${bias.id})},100)">Read full card</button>
        </div>
      </div>
    `;
    modal.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.6);display:flex;align-items:center;justify-content:center;z-index:9999;animation:fadeIn 0.3s ease';
    modal.querySelector('.daily-content').style.cssText = 'background:var(--card);padding:40px;max-width:500px;border-radius:8px;text-align:center;animation:slideUp 0.3s ease';
    modal.querySelector('.daily-label').style.cssText = 'font-size:0.7rem;text-transform:uppercase;letter-spacing:0.1em;color:var(--accent);margin-bottom:8px';
    modal.querySelector('h2').style.cssText = 'font-family:Playfair Display,serif;font-size:1.8rem;margin-bottom:12px';
    modal.querySelector('.daily-tagline').style.cssText = 'font-size:0.9rem;color:var(--accent);margin-bottom:16px';
    modal.querySelector('.daily-summary').style.cssText = 'font-size:0.8rem;line-height:1.7;color:#4a3e30;margin-bottom:16px';
    modal.querySelector('.daily-actions').style.cssText = 'display:flex;gap:12px;justify-content:center';
    modal.querySelectorAll('.daily-btn').forEach(btn => {
      btn.style.cssText = 'padding:10px 20px;border:1.5px solid var(--ink);background:transparent;cursor:pointer;font-family:DM Mono,monospace;font-size:0.7rem;letter-spacing:0.05em;text-transform:uppercase;color:var(--ink);border-radius:2px;transition:all 0.12s';
    });
    modal.querySelector('.secondary').style.cssText += ';background:var(--ink);color:var(--paper)';
    
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.remove();
    });
    
    document.body.appendChild(modal);
    return modal;
  }

  function showDailyBias() {
    const lastDaily = localStorage.getItem('cognitive-biases-daily-date');
    const today = new Date().toDateString();
    
    if (lastDaily === today) return;
    
    const bias = getRandomUnread();
    showBiasModal(bias, false);
    localStorage.setItem('cognitive-biases-daily-date', today);
  }

  function init() {
    const deepLinkedId = handleDeepLink();
    render();
    updateProgress();
    renderAchievements();
    if (deepLinkedId) {
      openCardModal(deepLinkedId, { skipHistory: true });
    } else {
      showDailyBias();
    }

    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.cat;
        expandedId = null;
        render();
      });
    });

    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
      searchInput.addEventListener('input', e => {
        currentSearch = e.target.value;
        expandedId = null;
        render();
      });
    }

    const gridBtn = document.getElementById('gridBtn');
    const listBtn = document.getElementById('listBtn');
    
    if (gridBtn) {
      gridBtn.addEventListener('click', () => {
        document.body.classList.remove('list-view');
        gridBtn.classList.add('active');
        if (listBtn) listBtn.classList.remove('active');
        expandedId = null;
        render();
      });
    }

    if (listBtn) {
      listBtn.addEventListener('click', () => {
        document.body.classList.add('list-view');
        listBtn.classList.add('active');
        if (gridBtn) gridBtn.classList.remove('active');
        expandedId = null;
        render();
      });
    }

    const surpriseBtn = document.getElementById('surpriseBtn');
    if (surpriseBtn) {
      surpriseBtn.addEventListener('click', surpriseMe);
    }

    const quizBtn = document.getElementById('quizBtn');
    if (quizBtn) {
      quizBtn.addEventListener('click', startQuiz);
    }

    const flashcardBtn = document.getElementById('flashcardBtn');
    if (flashcardBtn) {
      flashcardBtn.addEventListener('click', startFlashcards);
    }

    window.addEventListener('popstate', () => {
      const params = new URLSearchParams(window.location.search);
      const id = parseInt(params.get('id'), 10);
      if (id && biases.find(b => b.id === id)) {
        openCardModal(id, { skipHistory: true });
      } else {
        closeCardModal(true);
      }
    });
  }

  const ACHIEVEMENTS = [
    { id: 'first', name: 'First Step', icon: 'fa-seedling', condition: (r) => r >= 1 },
    { id: 'ten', name: 'Getting Started', icon: 'fa-book-open', condition: (r) => r >= 10 },
    { id: 'quarter', name: 'Quarter Way', icon: 'fa-bullseye', condition: (r) => r >= 42 },
    { id: 'half', name: 'Halfway There', icon: 'fa-bolt', condition: (r) => r >= 83 },
    { id: 'almost', name: 'Almost Done', icon: 'fa-fire', condition: (r) => r >= 125 },
    { id: 'master', name: 'Bias Master', icon: 'fa-trophy', condition: (r) => r >= 165 },
    { id: 'streak3', name: '3 Day Streak', icon: 'fa-calendar-days', condition: (r, s) => s >= 3 },
    { id: 'streak7', name: 'Week Warrior', icon: 'fa-dumbbell', condition: (r, s) => s >= 7 }
  ];

  function getAchievements() {
    const readIds = getReadIds();
    const streak = getStreak();
    const unlocked = [];
    ACHIEVEMENTS.forEach(a => {
      if (a.condition(readIds.length, streak)) unlocked.push(a.id);
    });
    return unlocked;
  }

  function renderAchievements() {
    const bar = document.getElementById('achievementsBar');
    if (!bar) return;
    const unlocked = getAchievements();
    bar.innerHTML = ACHIEVEMENTS.map(a => `
      <div class="achievement ${unlocked.includes(a.id) ? 'unlocked' : ''}">
        <i class="fa-solid ${a.icon} achievement-icon" aria-hidden="true"></i>
        <span>${a.name}</span>
      </div>
    `).join('');
  }

  function startQuiz() {
    const shuffled = [...biases].sort(() => Math.random() - 0.5);
    let current = 0;
    let score = 0;

    function showQuestion() {
      if (current >= 10) {
        showQuizResult(score, 10);
        return;
      }

      const bias = shuffled[current];
      const wrongOptions = biases.filter(b => b.id !== bias.id).sort(() => Math.random() - 0.5).slice(0, 3);
      const options = [bias, ...wrongOptions].sort(() => Math.random() - 0.5);

      const modal = document.createElement('div');
      modal.className = 'quiz-modal';
      modal.innerHTML = `
        <button class="close-modal">&times;</button>
        <div class="quiz-content">
          <div class="quiz-label">Question ${current + 1} of 10</div>
          <p class="quiz-question">${bias.example || bias.summary}</p>
          <div class="quiz-options">
            ${options.map(o => `<button class="quiz-option" data-id="${o.id}">${o.name}</button>`).join('')}
          </div>
          <div class="quiz-result" style="display:none;"></div>
        </div>
      `;
      modal.querySelector('.close-modal').onclick = () => modal.remove();
      modal.addEventListener('click', (e) => { if (e.target === modal) modal.remove(); });

      modal.querySelectorAll('.quiz-option').forEach(btn => {
        btn.onclick = () => {
          const selected = parseInt(btn.dataset.id);
          const correct = selected === bias.id;
          if (correct) score++;
          
          modal.querySelectorAll('.quiz-option').forEach(b => {
            if (parseInt(b.dataset.id) === bias.id) b.classList.add('correct');
            else if (parseInt(b.dataset.id) === selected && !correct) b.classList.add('wrong');
            b.disabled = true;
          });

          const result = modal.querySelector('.quiz-result');
          result.style.display = 'block';
          result.className = `quiz-result ${correct ? 'correct' : 'wrong'}`;
          result.innerHTML = correct
            ? '<i class="fa-solid fa-circle-check icon-inline" aria-hidden="true"></i>Correct!'
            : `<i class="fa-solid fa-circle-xmark icon-inline" aria-hidden="true"></i>It was ${bias.name}`;

          setTimeout(() => {
            current++;
            modal.remove();
            showQuestion();
          }, 1500);
        };
      });

      document.body.appendChild(modal);
    }

    showQuestion();
  }

  function showQuizResult(score, total) {
    const modal = document.createElement('div');
    modal.className = 'quiz-modal';
    modal.innerHTML = `
      <div class="quiz-content" style="text-align:center;">
        <div class="quiz-label">Quiz Complete!</div>
        <h2 style="font-family:Playfair Display,serif;font-size:2rem;margin:20px 0;">${score}/${total}</h2>
        <p style="font-size:0.85rem;color:var(--muted);margin-bottom:20px;">
          ${score === total ? 'Perfect score! You really know your biases!' : 
            score >= 7 ? 'Great job! You understand cognitive biases well.' :
            score >= 5 ? 'Not bad! Keep learning to improve.' : 'Keep studying! Practice makes perfect.'}
        </p>
        <button class="action-btn" onclick="this.closest('.quiz-modal').remove()">Close</button>
      </div>
    `;
    document.body.appendChild(modal);
  }

  function startFlashcards() {
    const readIds = getReadIds();
    const unread = biases.filter(b => !readIds.includes(b.id));
    const deck = unread.length > 0 ? unread : biases;
    const shuffled = [...deck].sort(() => Math.random() - 0.5);
    let current = 0;

    function showCard() {
      const bias = shuffled[current];
      const modal = document.createElement('div');
      modal.className = 'flashcard-modal';
      modal.innerHTML = `
        <button class="close-modal">&times;</button>
        <div class="flashcard-content">
          <div class="flashcard" onclick="this.classList.toggle('flipped')">
            <div class="flashcard-inner">
              <div class="flashcard-front">
                <h3>${bias.name}</h3>
                <p style="font-size:0.8rem;color:var(--muted);">${bias.tagline || ''}</p>
                <p class="flashcard-hint">Click to reveal definition</p>
              </div>
              <div class="flashcard-back">
                <p style="font-size:0.85rem;line-height:1.6;">${bias.summary}</p>
              </div>
            </div>
          </div>
          <div class="flashcard-counter">${current + 1} / ${shuffled.length}</div>
          <div class="flashcard-nav">
            <button class="action-btn" id="prevCard" ${current === 0 ? 'disabled' : ''}><i class="fa-solid fa-arrow-left icon-inline" aria-hidden="true"></i>Previous</button>
            <button class="action-btn" id="markRead"><i class="fa-regular fa-circle icon-inline" aria-hidden="true"></i>Mark as read</button>
            <button class="action-btn" id="nextCard">${current === shuffled.length - 1 ? 'Finish' : 'Next<i class="fa-solid fa-arrow-right icon-trailing" aria-hidden="true"></i>'}</button>
          </div>
        </div>
      `;

      modal.querySelector('.close-modal').onclick = () => modal.remove();
      modal.addEventListener('click', (e) => { if (e.target === modal) modal.remove(); });

      modal.querySelector('#prevCard').onclick = () => {
        if (current > 0) { current--; modal.remove(); showCard(); }
      };

      modal.querySelector('#nextCard').onclick = () => {
        if (current < shuffled.length - 1) { current++; modal.remove(); showCard(); }
        else modal.remove();
      };

      modal.querySelector('#markRead').onclick = () => {
        const ids = getReadIds();
        if (!ids.includes(bias.id)) {
          ids.push(bias.id);
          setReadIds(ids);
          updateProgress();
          renderAchievements();
          showToast('Marked as read!');
        }
      };

      document.body.appendChild(modal);
    }

    showCard();
  }

  function saveNote(id, text) {
    const notes = getNotes();
    notes[id] = text;
    setNotes(notes);
  }

  window.CognitiveBiases = {
    init,
    toggleCard,
    toggleRead,
    openCardModal,
    copyLink,
    shareBias,
    getBias,
    surpriseMe,
    startQuiz,
    startFlashcards,
    saveNote,
    scrollToCard
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
