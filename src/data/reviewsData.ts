export interface GoogleReview {
  id: string;
  authorName: string;
  authorPhoto?: string;
  isLocalGuide?: boolean;
  reviewsCount?: number;
  rating: number;
  relativeTime: string;
  text: string;
  highlightDish?: string;
  likesCount?: number;
}

export const GOOGLE_REVIEWS_STATS = {
  averageRating: 3.9,
  totalReviews: 446,
  googleMapsUrl: 'https://maps.app.goo.gl/kJu2AxEPFDuEEAnt7',
  restaurantName: 'مطعم وكافيه العالمية ٢',
  address: 'شارع عثمان بن عفان، فيصل، السويس',
};

export const GOOGLE_REVIEWS: GoogleReview[] = [
  {
    id: 'rev-1',
    authorName: 'أحمد الصاوي',
    isLocalGuide: true,
    reviewsCount: 38,
    rating: 5,
    relativeTime: 'منذ أسبوعين',
    text: 'ما شاء الله تبارك الله، من أفضل وأرقى مطاعم السويس في الفول والطعمية والمشويات. رول الطعمية بالكيري اختراع بجد وطعمه حكاية، وخدمة التوصيل سريعة جداً والأكل بيوصل سخن ومحكم التغليف.',
    highlightDish: 'رول طعمية كيري وميكس جريل',
    likesCount: 14,
  },
  {
    id: 'rev-2',
    authorName: 'مروة عبد الرحمن',
    isLocalGuide: true,
    reviewsCount: 52,
    rating: 5,
    relativeTime: 'منذ 3 أسابيع',
    text: 'المكان ممتاز جداً ونظيف على مدار الـ 24 ساعة. جربنا وجبة ميكس جريل العالمية والكفتة المشوية عالفحم، التتبيلة ممتازة والأرز البسمتي مفلفل والعيش طازة وساخن. الأسعار معقولة جداً مقارنة بالجودة.',
    highlightDish: 'ميكس جريل العالمية',
    likesCount: 9,
  },
  {
    id: 'rev-3',
    authorName: 'محمود عثمان الزيات',
    isLocalGuide: false,
    rating: 5,
    relativeTime: 'منذ شهر',
    text: 'فول بالزيت الحار والسمنة البلدي عندهم طعمه بلدي أصيل يفكرك بأيام زمان. وقرص الطعمية المقرمشة المحشية لا يعلى عليه. شباب المحل محترمين جداً وقمة في الذوق.',
    highlightDish: 'علبة فول زيت حار وطعمية محشية',
    likesCount: 11,
  },
  {
    id: 'rev-4',
    authorName: 'د. سارة إبراهيم',
    isLocalGuide: true,
    reviewsCount: 19,
    rating: 5,
    relativeTime: 'منذ شهرين',
    text: 'دايماً بطلب منهم دليفري فيصل في أوقات متأخرة بالليل، أسرع دليفري بالسويس والأوردر بيجي كامل ومظبوط بالملي. سندوتشات الحلو مثل ديناميت الحلو واللوتس بالقشطة فظيعة!',
    highlightDish: 'ديناميت حلو ورولات بطاطس',
    likesCount: 16,
  },
  {
    id: 'rev-5',
    authorName: 'كابتن إسلام حسن',
    isLocalGuide: false,
    rating: 5,
    relativeTime: 'منذ شهرين',
    text: 'شغل عالي وفخامة، كفاية إن كل أنواع العيش متاحة (فرنساوي، شامي، كيزر، بلدي). وجبة ربع الفرخة والشيش طاووق وجبة متكاملة ومحترمة تشبع أي حد. ربنا يباركلهم.',
    highlightDish: 'وجبة شيش طاووق',
    likesCount: 7,
  },
  {
    id: 'rev-6',
    authorName: 'ياسمين ممدوح',
    isLocalGuide: true,
    reviewsCount: 26,
    rating: 5,
    relativeTime: 'منذ 3 أشهر',
    text: 'منيو غني جداً ومتنوع وفيه اختيارات ترضي الصغير والكبير، تشكيلة رولات البطاطس بالصوصات والتكساس والجبن ممتازة ومبتكرة جداً ومميزة عن أي مكان تاني.',
    highlightDish: 'رول بطاطس بالصوصات وتكساس',
    likesCount: 12,
  },
];
