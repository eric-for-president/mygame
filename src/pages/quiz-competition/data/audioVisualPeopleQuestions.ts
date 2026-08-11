import type { Question } from './questions';

const AUDIO_VISUAL_CATEGORY = 'Audio Visual People';

function shuffleArray<T>(items: T[]): T[] {
  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }
  return shuffled;
}

const makeImageQuestion = (
  id: string,
  answer: string,
  imageUrl: string,
  imageAlt: string,
  difficulty: Question['difficulty'] = 'easy'
): Question => ({
  id,
  text: 'Identify this personality from the portrait.',
  answer,
  category: AUDIO_VISUAL_CATEGORY,
  difficulty,
  imageUrl,
  imageAlt,
});

const makeAudioQuestion = (
  id: string,
  answer: string,
  audioUrl: string,
  difficulty: Question['difficulty'] = 'easy',
  text: string = 'Identify this personality from the voice clip.',
  imageUrl?: string,
  audioPrompt?: string
): Question => ({
  id,
  text,
  answer,
  category: AUDIO_VISUAL_CATEGORY,
  difficulty,
  audioUrl,
  imageUrl,
  audioPrompt,
  imageAlt: `${answer} speech / voice clip`,
});

const audioVisualPeopleQuestionsRaw: Question[] = [
  makeImageQuestion('av-img-1', 'Prithvi Narayan Shah', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Amar_Chitrakar_-_Portrait_of_King_Prithvi_Narayan_Shah.jpg/960px-Amar_Chitrakar_-_Portrait_of_King_Prithvi_Narayan_Shah.jpg', 'Portrait of Prithvi Narayan Shah', 'medium'),
  makeImageQuestion('av-img-2', 'George Washington', 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Gilbert_Stuart_Williamstown_Portrait_of_George_Washington.jpg/960px-Gilbert_Stuart_Williamstown_Portrait_of_George_Washington.jpg', 'Portrait of George Washington', 'easy'),
  makeImageQuestion('av-img-3', 'Abraham Lincoln', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Abraham_Lincoln_1863_Portrait_%283x4_cropped%29.jpg/960px-Abraham_Lincoln_1863_Portrait_%283x4_cropped%29.jpg', 'Portrait of Abraham Lincoln', 'easy'),
  makeImageQuestion('av-img-4', 'Bill Gates', 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Bill_Gates_at_the_European_Commission_-_P067383-987995_%28cropped%29_5.jpg/960px-Bill_Gates_at_the_European_Commission_-_P067383-987995_%28cropped%29_5.jpg', 'Portrait of Bill Gates', 'easy'),
  makeImageQuestion('av-img-5', 'Elon Musk', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Elon_Musk_-_54820081119_%28cropped%29.jpg/960px-Elon_Musk_-_54820081119_%28cropped%29.jpg', 'Portrait of Elon Musk', 'easy'),
  makeImageQuestion('av-img-6', 'Jeff Bezos', 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/260202-D-PM193-2205_SECWAR_Arsenal_of_Freedom_Tour_-_Florida_%283x4_cropped_on_Bezos_and_rotated%29.jpg/960px-260202-D-PM193-2205_SECWAR_Arsenal_of_Freedom_Tour_-_Florida_%283x4_cropped_on_Bezos_and_rotated%29.jpg', 'Portrait of Jeff Bezos', 'easy'),
  makeImageQuestion('av-img-7', 'Mukesh Ambani', 'https://upload.wikimedia.org/wikipedia/commons/6/69/Mukesh_Ambani.jpg', 'Portrait of Mukesh Ambani', 'easy'),
  makeImageQuestion('av-img-8', 'Amitabh Bachchan', 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Indian_actor_Amitabh_Bachchan.jpg/960px-Indian_actor_Amitabh_Bachchan.jpg', 'Portrait of Amitabh Bachchan', 'easy'),
  makeImageQuestion('av-img-9', 'Jawaharlal Nehru', 'https://upload.wikimedia.org/wikipedia/commons/9/97/Nehru_in_the_Netherlands%2C_1957.jpg', 'Portrait of Jawaharlal Nehru', 'medium'),
  makeImageQuestion('av-img-10', 'Barack Obama', 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/President_Barack_Obama.jpg/960px-President_Barack_Obama.jpg', 'Portrait of Barack Obama', 'easy'),
  makeImageQuestion('av-img-11', 'A. P. J. Abdul Kalam', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/A._P._J._Abdul_Kalam.jpg/960px-A._P._J._Abdul_Kalam.jpg', 'Portrait of A. P. J. Abdul Kalam', 'easy'),
  makeImageQuestion('av-img-12', 'B. P. Koirala', 'https://upload.wikimedia.org/wikipedia/commons/b/b9/BP_Koirala.jpg', 'Portrait of B. P. Koirala', 'medium'),
  makeImageQuestion('av-img-13', 'Balen Shah', 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Rt._Honourable_Prime_Minister_Balendra_Shah.jpg/960px-Rt._Honourable_Prime_Minister_Balendra_Shah.jpg', 'Portrait of Balen Shah', 'easy'),
  makeImageQuestion('av-img-14', 'Bhimsen Thapa', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Bhimsen_Thapa_sitting.jpg/960px-Bhimsen_Thapa_sitting.jpg', 'Portrait of Bhimsen Thapa', 'medium'),
  makeImageQuestion('av-img-15', 'Kamala Harris', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Kamala_Harris_Vice_Presidential_Portrait.jpg/960px-Kamala_Harris_Vice_Presidential_Portrait.jpg', 'Portrait of Kamala Harris', 'easy'),
  makeImageQuestion('av-img-16', 'Pushpa Kamal Dahal', 'https://upload.wikimedia.org/wikipedia/commons/5/58/Prachanda.jpg', 'Portrait of Pushpa Kamal Dahal', 'easy'),
  makeImageQuestion('av-img-17', 'Rajinikanth', 'https://upload.wikimedia.org/wikipedia/commons/d/d2/Rajinikanth_in_2019.jpg', 'Portrait of Rajinikanth', 'easy'),
  makeImageQuestion('av-img-18', 'Ratan Tata', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Shri_Ratan_Naval_Tata.jpg/960px-Shri_Ratan_Naval_Tata.jpg', 'Portrait of Ratan Tata', 'easy'),
  makeImageQuestion('av-img-19', 'Sachin Tendulkar', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/The_cricket_legend_Sachin_Tendulkar_at_the_Oval_Maidan_in_Mumbai_During_the_Duke_and_Duchess_of_Cambridge_Visit%2826271019082%29.jpg/960px-The_cricket_legend_Sachin_Tendulkar_at_the_Oval_Maidan_in_Mumbai_During_the_Duke_and_Duchess_of_Cambridge_Visit%2826271019082%29.jpg', 'Portrait of Sachin Tendulkar', 'easy'),
  makeImageQuestion('av-img-20', 'Shah Rukh Khan', 'https://upload.wikimedia.org/wikipedia/commons/6/6e/Shah_Rukh_Khan_graces_the_launch_of_the_new_Santro.jpg', 'Portrait of Shah Rukh Khan', 'easy'),
  makeImageQuestion('av-img-21', 'Sher Bahadur Deuba', 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Sher_Bahadur_Deuba_November_2021_crop.jpg', 'Portrait of Sher Bahadur Deuba', 'easy'),
  makeImageQuestion('av-img-22', 'Steve Jobs', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Steve_Jobs_Headshot_2010_%28cropped_4%29.jpg/960px-Steve_Jobs_Headshot_2010_%28cropped_4%29.jpg', 'Portrait of Steve Jobs', 'easy'),
  makeImageQuestion('av-img-23', 'Sushil Koirala', 'https://upload.wikimedia.org/wikipedia/commons/0/05/The_Prime_Minister_of_Nepal%2C_Mr._Sushil_Koirala%2C_on_the_sidelines_of_the_third_Summit_of_the_Bay_of_Bengal_Initiative_for_Multi-Sectoral_Technical_and_Economic_Cooperation_%28BIMSTEC%29%2C_at_Nay_Pyi_Taw.jpg', 'Portrait of Sushil Koirala', 'medium'),
  makeImageQuestion('av-img-24', 'Virat Kohli', 'https://upload.wikimedia.org/wikipedia/commons/e/ef/Virat_Kohli_during_the_India_vs_Aus_4th_Test_match_at_Narendra_Modi_Stadium_on_09_March_2023.jpg', 'Portrait of Virat Kohli', 'easy'),
  makeImageQuestion('av-img-25', 'Albert Einstein', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Albert_Einstein_Head_cleaned.jpg/960px-Albert_Einstein_Head_cleaned.jpg', 'Portrait of Albert Einstein', 'medium'),
  makeImageQuestion('av-img-26', 'Cristiano Ronaldo', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Cristiano_Ronaldo_Croatia_v_Portugal_2_July_2026-075_%28cropped%29.jpg/960px-Cristiano_Ronaldo_Croatia_v_Portugal_2_July_2026-075_%28cropped%29.jpg', 'Portrait of Cristiano Ronaldo', 'easy'),
  makeImageQuestion('av-img-27', 'Leonardo da Vinci', 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Francesco_Melzi_-_Portrait_of_Leonardo.png/960px-Francesco_Melzi_-_Portrait_of_Leonardo.png', 'Portrait of Leonardo da Vinci', 'medium'),
  makeImageQuestion('av-img-28', 'Lionel Messi', 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Leo_Messi_Argentina_v_Egypt_7_July_2026-1.jpg/960px-Leo_Messi_Argentina_v_Egypt_7_July_2026-1.jpg', 'Portrait of Lionel Messi', 'easy'),
  makeImageQuestion('av-img-29', 'Marie Curie', 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Marie_Curie_c._1920s.jpg/960px-Marie_Curie_c._1920s.jpg', 'Portrait of Marie Curie', 'medium'),
  makeImageQuestion('av-img-30', 'Martin Luther King Jr.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Martin_Luther_King%2C_Jr..jpg/960px-Martin_Luther_King%2C_Jr..jpg', 'Portrait of Martin Luther King Jr.', 'medium'),
  makeImageQuestion('av-img-31', 'Nelson Mandela', 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Nelson_Mandela_1994.jpg/960px-Nelson_Mandela_1994.jpg', 'Portrait of Nelson Mandela', 'medium'),
  makeImageQuestion('av-img-32', 'Oprah Winfrey', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Oprah_Winfrey_2016.jpg/960px-Oprah_Winfrey_2016.jpg', 'Portrait of Oprah Winfrey', 'easy'),
  makeImageQuestion('av-img-33', 'Satya Nadella', 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/MS-Exec-Nadella-Satya-2017-08-31-22_%28cropped%29.jpg/960px-MS-Exec-Nadella-Satya-2017-08-31-22_%28cropped%29.jpg', 'Portrait of Satya Nadella', 'easy'),
  makeImageQuestion('av-img-34', 'Sundar Pichai', 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Sundar_Pichai_-_2023_%28cropped%29.jpg', 'Portrait of Sundar Pichai', 'easy'),
  makeImageQuestion('av-img-35', 'Taylor Swift', 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Taylor_Swift_at_the_2023_MTV_Video_Music_Awards_%283%29.png/960px-Taylor_Swift_at_the_2023_MTV_Video_Music_Awards_%283%29.png', 'Portrait of Taylor Swift', 'easy'),
  makeImageQuestion('av-img-36', 'Tim Cook', 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Tim_Cook_March_2026_%28cropped_2%29.jpg', 'Portrait of Tim Cook', 'easy'),
  makeImageQuestion('av-img-37', 'Warren Buffett', 'https://upload.wikimedia.org/wikipedia/commons/d/d4/Warren_Buffett_at_the_2015_SelectUSA_Investment_Summit_%28cropped%29.jpg', 'Portrait of Warren Buffett', 'easy'),
  makeImageQuestion('av-img-38', 'William Shakespeare', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/William_Shakespeare_by_John_Taylor%2C_edited.jpg/960px-William_Shakespeare_by_John_Taylor%2C_edited.jpg', 'Portrait of William Shakespeare', 'medium'),
  makeImageQuestion('av-img-39', 'Mark Zuckerberg', 'https://upload.wikimedia.org/wikipedia/commons/0/0e/F20250904AH-2824_%2854778373111%29_%283x4_cropped_on_Zuckerberg_following_the_rule_of_thirds%29.jpg', 'Portrait of Mark Zuckerberg', 'easy'),
  makeImageQuestion('av-img-40', 'Nita Ambani', 'https://upload.wikimedia.org/wikipedia/commons/8/83/The_Prime_Minister%2C_Shri_Narendra_Modi_rededicating_Sir_H.N._Reliance_Foundation_Hospital_and_Research_Centre_to_the_Nation%2C_in_Mumbai_on_October_25%2C_2014._The_Governor_of_Maharashtra%2C_Shri_C._Vidyasagar_Rao_is_also_seen_%28cropped%29.jpg', 'Portrait of Nita Ambani', 'easy'),
  makeImageQuestion('av-img-41', 'S. Jaishankar', 'https://upload.wikimedia.org/wikipedia/commons/7/7b/The_official_portrait_of_External_Minister_Subrahmanyam_Jaishankar.jpg', 'Portrait of S. Jaishankar', 'easy'),
  makeImageQuestion('av-img-42', 'Sushma Swaraj', 'https://upload.wikimedia.org/wikipedia/commons/6/66/Secretary_Tillerson_is_Greeted_by_Indian_Minister_of_External_Affairs_Swaraj_%2824074726498%29_%28cropped%29.jpg', 'Portrait of Sushma Swaraj', 'easy'),
  makeImageQuestion('av-img-43', 'Aamir Khan', 'https://upload.wikimedia.org/wikipedia/commons/6/65/Aamir_Khan_at_the_success_bash_of_Secret_Superstar.jpg', 'Portrait of Aamir Khan', 'easy'),
  makeImageQuestion('av-img-44', 'Deepika Padukone', 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Deepika_Padukone_2025_%281%29.png/960px-Deepika_Padukone_2025_%281%29.png', 'Portrait of Deepika Padukone', 'easy'),
  makeImageQuestion('av-img-45', 'Tom Hanks', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/TomHanksPrincEdw031223_%2811_of_41%29_%28cropped%29.jpg/960px-TomHanksPrincEdw031223_%2811_of_41%29_%28cropped%29.jpg', 'Portrait of Tom Hanks', 'easy'),
  makeImageQuestion('av-img-46', 'Alia Bhatt', 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Alia_Bhatt_2024.jpg', 'Portrait of Alia Bhatt', 'easy'),
  makeImageQuestion('av-img-47', 'Madan Bhandari', 'https://commons.wikimedia.org/wiki/Special:FilePath/Madan_bhandari.jpg', 'Portrait of Madan Bhandari', 'medium'),

  makeAudioQuestion('av-aud-1', 'Mahatma Gandhi', 'https://commons.wikimedia.org/wiki/Special:FilePath/M.%20K.%20Gandhi%20speech%20IARC.oga', 'medium'),
  makeAudioQuestion('av-aud-2', 'Narendra Modi', 'https://commons.wikimedia.org/wiki/Special:FilePath/Narendra%20Modi%20voice.ogg', 'easy'),
  makeAudioQuestion('av-aud-3', 'Donald Trump', 'https://commons.wikimedia.org/wiki/Special:FilePath/Trump-victory-audio-2024.ogg', 'easy'),
  makeAudioQuestion('av-aud-4', 'George W. Bush', 'https://commons.wikimedia.org/wiki/Special:FilePath/George%20W.%20Bush%20Speech%20-%20September%2011,%202001.ogg', 'easy'),
  makeAudioQuestion('av-aud-5', 'Barack Obama', 'https://commons.wikimedia.org/wiki/Special:FilePath/Barack%20Obama%20inauguration%20speech%202009.ogg', 'easy'),
  makeAudioQuestion('av-aud-6', 'Joe Biden', 'https://commons.wikimedia.org/wiki/Special:FilePath/Joe%20Biden%20gives%20remarks%20on%20the%20Inflation%20Reduction%20Act.ogg', 'easy'),
  makeAudioQuestion('av-aud-7', 'Sundar Pichai', 'https://commons.wikimedia.org/wiki/Special:FilePath/Sundar%20Pichai%20on%20being%20CEO%20of%20Google.ogg', 'easy'),
  makeAudioQuestion(
    'av-aud-8',
    'Martin Luther King Jr.',
    'https://archive.org/download/The_Speeches-8291/Martin_Luther_King_-_01_-_Speech_at_Washington_DC_28_Aug_1963_I_Have_a_Dream.ogg',
    'easy',
    'Identify the Civil Rights leader delivering his historic "I Have a Dream" speech at the Lincoln Memorial in 1963.',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Martin_Luther_King%2C_Jr..jpg/960px-Martin_Luther_King%2C_Jr..jpg',
    'I have a dream that my four little children will one day live in a nation where they will not be judged by the color of their skin but by the content of their character. - Martin Luther King Jr.'
  ),
  makeAudioQuestion('av-aud-9', 'Hillary Clinton', 'https://commons.wikimedia.org/wiki/Special:FilePath/Sen.%20Hillary%20Clinton%20on%20the%20September%2011%20Attacks.ogg', 'easy'),
  makeAudioQuestion(
    'av-aud-10',
    'Madan Bhandari',
    '/audio/madan-bhandari-speech.webm',
    'medium',
    'Who delivered the historic 2047 BS speech challenging King Birendra: "यदि राजा वीरेन्द्रलाई राजनीति गर्ने रहर छ भने, श्रीपेच फुकालेर खुलामञ्चमा चुनाव लड्न आऊन्"?',
    'https://commons.wikimedia.org/wiki/Special:FilePath/Madan_bhandari.jpg',
    'यदि राजा वीरेन्द्रलाई राजनीति गर्ने रहर छ भने, श्रीपेच फुकालेर खुलामञ्चमा आऊन् र जनताको मत जितेर देखाऊन्! - मदन भण्डारी (२०४७ चैत ५ खुलामञ्च भाषण)'
  ),

  makeImageQuestion('av-nep-1', 'K. P. Sharma Oli', 'https://upload.wikimedia.org/wikipedia/commons/d/dd/The_Prime_Minister_of_Nepal%2C_Shri_KP_Sharma_Oli_at_Bangkok%2C_in_Thailand_on_April_04%2C_2025_%28cropped%29.jpg', 'Portrait of K. P. Sharma Oli', 'easy'),
  makeImageQuestion('av-nep-2', 'Rabi Lamichhane', 'https://commons.wikimedia.org/wiki/Special:FilePath/Rabi_Lamichhane.webp', 'Portrait of Rabi Lamichhane', 'easy'),
  makeImageQuestion('av-nep-3', 'Harka Sampang', 'https://commons.wikimedia.org/wiki/Special:FilePath/Harka_Sampang_%28cropped%29.png', 'Portrait of Harka Sampang', 'easy'),
  makeImageQuestion('av-nep-4', 'Gagan Thapa', 'https://commons.wikimedia.org/wiki/Special:FilePath/Gagan_Thapa_%E0%A4%97%E0%A4%97%E0%A4%A8_%E0%A4%A5%E0%A4%BE%E0%A4%AA%E0%A4%BE_Member_of_Parliament%2C_Pratinidhi_Sabha_%28cropped%29.jpg', 'Portrait of Gagan Thapa', 'easy'),
  makeImageQuestion('av-nep-5', 'Rabi Lamichhane', 'https://commons.wikimedia.org/wiki/Special:FilePath/Rabi%20Lamichhane.webp', 'Portrait of Rabi Lamichhane', 'easy'),
];

export const audioVisualPeopleQuestions = shuffleArray([...audioVisualPeopleQuestionsRaw]);