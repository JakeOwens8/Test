// ===== INNER WEST SUBURBS =====
const INNER_WEST = [
  'Annandale', 'Ashfield', 'Balmain', 'Balmain East', 'Birchgrove',
  'Burwood', 'Camperdown', 'Croydon', 'Drummoyne', 'Dulwich Hill',
  'Erskineville', 'Five Dock', 'Forest Lodge', 'Glebe', 'Haberfield',
  'Leichhardt', 'Lilyfield', 'Marrickville', 'Newtown', 'Petersham',
  'Rozelle', 'St Peters', 'Summer Hill', 'Sydenham', 'Tempe'
];

// ===== STATE =====
// Shape: { [suburb]: [ { id, name, reviews: [{rating, text}] } ] }
let data = JSON.parse(localStorage.getItem('burgerData') || '{}');

// Version-based data reset so new seed data loads fresh
const DATA_VERSION = 2;
if (parseInt(localStorage.getItem('burgerDataVersion') || '1') < DATA_VERSION) {
  data = {};
  localStorage.setItem('burgerDataVersion', DATA_VERSION);
}

// Ensure all Inner West suburbs exist in data
INNER_WEST.forEach(s => { if (!data[s]) data[s] = []; });

// Seed with real Inner West burger stores if nothing stored yet
const hasAnyStores = Object.values(data).some(s => s.length > 0);
if (!hasAnyStores) {
  const seed = {
    'Annandale': [
      { id: uid(), name: "Chargrill Charlie's", reviews: [{ rating: 4, text: "Award-winning chicken burger, been around for 30 years for a reason." }, { rating: 4, text: "Love the house chilli sauce. Consistent every time." }, { rating: 4, text: "Juicy and well-seasoned. Great value for the portion size." }] },
      { id: uid(), name: "The Annandale Hotel", reviews: [{ rating: 4, text: "Pub burger done right — thick patty, proper cheese pull." }, { rating: 3, text: "Good for a pub burger but nothing too exciting." }, { rating: 4, text: "Cold beer, great burger. What more do you need?" }] },
      { id: uid(), name: "Grillhouse Annandale", reviews: [{ rating: 5, text: "Incredible smash patties, perfectly crispy edges." }, { rating: 4, text: "Super fresh buns and a killer special sauce." }, { rating: 5, text: "Best in the suburb, full stop." }] },
      { id: uid(), name: "The Settlers Arms", reviews: [{ rating: 3, text: "Decent burger but a bit pricey for what you get." }, { rating: 4, text: "Good vibe, the wagyu option is worth it." }, { rating: 3, text: "Average pub burger. Fine but not memorable." }] },
      { id: uid(), name: "Newtown Arms Burger Bar", reviews: [{ rating: 4, text: "Solid neighbourhood spot, generous servings." }, { rating: 5, text: "The double smash is outrageously good." }, { rating: 4, text: "Friendly staff and consistently great quality." }] },
    ],
    'Ashfield': [
      { id: uid(), name: "Excelsior Jones", reviews: [{ rating: 5, text: "The Big Poppa burger is an explosion of flavour. Unmissable." }, { rating: 5, text: "Moved here from Surry Hills and they brought quality with them." }, { rating: 4, text: "Dessert burgers too?! Genius. The savoury ones are fantastic." }] },
      { id: uid(), name: "Vindmill", reviews: [{ rating: 4, text: "Solid smash burgers, always fresh and well assembled." }, { rating: 4, text: "Great spot for a quick and tasty burger fix." }, { rating: 5, text: "One of Ashfield's best kept secrets. Highly recommend." }] },
      { id: uid(), name: "Charcoal Boy", reviews: [{ rating: 4, text: "Charcoal chicken burger is amazing. Perfectly marinated." }, { rating: 4, text: "Love the smoky flavour. Great sides too." }, { rating: 3, text: "Good burger but service can be slow at peak times." }] },
      { id: uid(), name: "Frango Ashfield", reviews: [{ rating: 4, text: "Portuguese-style chicken burger — crispy skin, great peri-peri." }, { rating: 5, text: "Hands down the best chicken burger in the Inner West." }, { rating: 4, text: "Always fresh and piping hot. Excellent value." }] },
      { id: uid(), name: "The Hub House Diner", reviews: [{ rating: 3, text: "Classic American diner feel. Burger was decent." }, { rating: 4, text: "Milkshake and burger combo is unbeatable." }, { rating: 3, text: "A bit greasy but that's half the fun." }] },
    ],
    'Balmain': [
      { id: uid(), name: "Eat at Rob's", reviews: [{ rating: 5, text: "The double cheeseburger here is easily one of the best in Sydney." }, { rating: 5, text: "Perfect brisket and chuck blend, great cheese pull every time." }, { rating: 4, text: "Lines can be long but it's always worth the wait." }] },
      { id: uid(), name: "The Balmain Hotel", reviews: [{ rating: 4, text: "Lovely pub atmosphere with a great house burger on the menu." }, { rating: 3, text: "Standard pub burger. Fine for a casual meal." }, { rating: 4, text: "Well-seasoned patty, good toppings. Solid value." }] },
      { id: uid(), name: "The London Hotel", reviews: [{ rating: 4, text: "Great classic burger in a beautiful old pub setting." }, { rating: 4, text: "The bacon cheeseburger here is underrated." }, { rating: 3, text: "Decent enough. Better for the pub experience than the food." }] },
      { id: uid(), name: "The Cricketers Arms", reviews: [{ rating: 3, text: "Okay burger, nothing special. Nice spot though." }, { rating: 4, text: "The wagyu burger with truffle mayo is a winner." }, { rating: 4, text: "Good portion size and friendly service." }] },
      { id: uid(), name: "Riverview Hotel", reviews: [{ rating: 4, text: "Harbour views and a great burger — perfect combo." }, { rating: 5, text: "The smash burger with caramelised onions was incredible." }, { rating: 4, text: "Consistently good. One of our local favourites." }] },
    ],
    'Balmain East': [
      { id: uid(), name: "The Dry Dock Hotel", reviews: [{ rating: 4, text: "Solid pub burger with great harbour atmosphere." }, { rating: 4, text: "The Dry Dock burger with special sauce is excellent." }, { rating: 3, text: "Good spot but a bit pricey." }] },
      { id: uid(), name: "East Balmain Grill", reviews: [{ rating: 5, text: "Hidden gem! Best smash burger on this side of the harbour." }, { rating: 4, text: "Perfectly seasoned patty, toasted bun, great pickles." }, { rating: 5, text: "Worth the trip. Outstanding quality every visit." }] },
      { id: uid(), name: "The Watch House Kitchen", reviews: [{ rating: 4, text: "Historic building, great burger. Love the vibe." }, { rating: 3, text: "Burger was good but not exceptional for the price." }, { rating: 4, text: "The chicken option is surprisingly delicious here." }] },
      { id: uid(), name: "Harbour Bites", reviews: [{ rating: 4, text: "Great casual spot with water views and tasty burgers." }, { rating: 4, text: "Fresh ingredients, you can taste the difference." }, { rating: 3, text: "Good but a bit small for the price." }] },
      { id: uid(), name: "The East Side Kitchen", reviews: [{ rating: 4, text: "Wagyu patty melts in your mouth. Brilliant." }, { rating: 5, text: "Truffle aioli burger is next level. Best in the east." }, { rating: 4, text: "Consistently excellent. Never had a bad meal here." }] },
    ],
    'Birchgrove': [
      { id: uid(), name: "The Birchgrove Hotel", reviews: [{ rating: 4, text: "Great neighbourhood pub with a solid burger offering." }, { rating: 3, text: "Standard pub fare but done well." }, { rating: 4, text: "Love coming here on weekends. Burger never disappoints." }] },
      { id: uid(), name: "Grove Café", reviews: [{ rating: 4, text: "Lovely café vibe with a seriously good gourmet burger." }, { rating: 5, text: "The pulled pork burger here is exceptional." }, { rating: 4, text: "Great coffee and great burger — can't go wrong." }] },
      { id: uid(), name: "The Bells Hotel Birchgrove", reviews: [{ rating: 3, text: "Decent pub burger, nothing too fancy." }, { rating: 4, text: "Good value, large portions. Perfectly cooked patty." }, { rating: 3, text: "Average but reliable. Good for a feed after footy." }] },
      { id: uid(), name: "Corner Kitchen Birchgrove", reviews: [{ rating: 4, text: "Neighbourhood gem. The smash burger is superb." }, { rating: 4, text: "Friendly staff and consistently great food." }, { rating: 5, text: "Best burger in Birchgrove, not even close." }] },
      { id: uid(), name: "Harbour Smash", reviews: [{ rating: 4, text: "Beautiful views and excellent smash burgers." }, { rating: 4, text: "Great spot for a long lunch with a cold drink." }, { rating: 3, text: "Good but can get very busy on weekends." }] },
    ],
    'Burwood': [
      { id: uid(), name: "Choo-Choo's Takeaway", reviews: [{ rating: 4, text: "A Burwood institution. The burger and chips combo is iconic." }, { rating: 4, text: "Cheap, cheerful and consistently tasty." }, { rating: 5, text: "Has been my go-to for years. Never lets me down." }] },
      { id: uid(), name: "Grill'd Burwood", reviews: [{ rating: 4, text: "Reliable chain option with decent quality ingredients." }, { rating: 3, text: "Good healthy option but a bit on the pricey side." }, { rating: 4, text: "Love the herbed bun. Always a solid feed." }] },
      { id: uid(), name: "Ribs & Burgers Burwood", reviews: [{ rating: 4, text: "Great American-style burgers. The BBQ sauce is amazing." }, { rating: 4, text: "Generous portions and great flavour combinations." }, { rating: 3, text: "Good but can be slow during lunch rush." }] },
      { id: uid(), name: "Burger Project Burwood", reviews: [{ rating: 4, text: "Great quality for a mall burger joint. Fresh and tasty." }, { rating: 4, text: "The classic cheeseburger here is actually excellent." }, { rating: 3, text: "Solid but nothing you haven't had before." }] },
      { id: uid(), name: "The Burwood Hotel", reviews: [{ rating: 4, text: "Big pub burger with all the trimmings. Great value." }, { rating: 3, text: "Standard pub burger. Gets the job done." }, { rating: 4, text: "Always a reliable spot after the cricket." }] },
    ],
    'Camperdown': [
      { id: uid(), name: "Deus Cafe", reviews: [{ rating: 5, text: "Incredible burgers in a converted industrial space. The vibe is unmatched." }, { rating: 4, text: "Great burger alongside custom motorcycles — only in Sydney." }, { rating: 5, text: "Genuinely one of my favourite spots in the entire city." }] },
      { id: uid(), name: "The Camperdown Hotel", reviews: [{ rating: 4, text: "Great pub burger with good beer selection." }, { rating: 3, text: "Standard pub fare, good value for money." }, { rating: 4, text: "The bacon burger here is a solid choice." }] },
      { id: uid(), name: "Smoky Smash Camperdown", reviews: [{ rating: 5, text: "Incredible smash patties with perfectly crispy edges." }, { rating: 4, text: "The spicy mayo sauce is ridiculously addictive." }, { rating: 5, text: "Best smash burger in the area. Don't sleep on this place." }] },
      { id: uid(), name: "Grill'd Camperdown", reviews: [{ rating: 3, text: "Reliable and healthy-ish option. Good bun-to-patty ratio." }, { rating: 4, text: "Great for a quick lunch. The Simply Grill'd is my go-to." }, { rating: 3, text: "Decent but feels expensive for what it is." }] },
      { id: uid(), name: "The Vic on the Park", reviews: [{ rating: 4, text: "Lovely old pub with a surprisingly good burger." }, { rating: 4, text: "The wagyu option here is excellent value." }, { rating: 3, text: "Good enough. Better for drinks than food." }] },
    ],
    'Croydon': [
      { id: uid(), name: "The Croydon Hotel", reviews: [{ rating: 4, text: "Great local pub burger. Always hot and fresh." }, { rating: 3, text: "Standard pub grub but reliably decent." }, { rating: 4, text: "Love this place for a Friday night burger." }] },
      { id: uid(), name: "Patty Shack Croydon", reviews: [{ rating: 5, text: "Discovered this place by accident and now I can't stop coming back." }, { rating: 4, text: "Incredible smash burgers at great prices. Highly recommend." }, { rating: 5, text: "Hands down best burger in Croydon. A real hidden gem." }] },
      { id: uid(), name: "Flame Grill", reviews: [{ rating: 4, text: "Great charcoal flavour on the patty. Stands out from the crowd." }, { rating: 4, text: "Really enjoyed the smoky taste. Excellent value." }, { rating: 3, text: "Good burger but service is a bit slow." }] },
      { id: uid(), name: "The Local Croydon", reviews: [{ rating: 3, text: "Typical pub burger. Nice spot though." }, { rating: 4, text: "Surprisingly tasty for a local pub. Good size too." }, { rating: 3, text: "Nothing exceptional but consistent and cheap." }] },
      { id: uid(), name: "Croydon Kitchen", reviews: [{ rating: 4, text: "Great café-style burger with interesting toppings." }, { rating: 4, text: "Love the brioche bun and house pickle combo here." }, { rating: 4, text: "A great little find in Croydon. Highly underrated." }] },
    ],
    'Drummoyne': [
      { id: uid(), name: "Chargrill Charlie's Drummoyne", reviews: [{ rating: 4, text: "Same great quality as Annandale. Always consistent." }, { rating: 4, text: "Chicken burger is sensational. Worth the drive." }, { rating: 5, text: "Best fast-casual burger in Drummoyne, no contest." }] },
      { id: uid(), name: "The Iron Duke Hotel", reviews: [{ rating: 4, text: "Great pub burger with a nice beer garden." }, { rating: 3, text: "Decent burger but nothing to write home about." }, { rating: 4, text: "Love this place for a casual Sunday burger." }] },
      { id: uid(), name: "Bay View Burgers", reviews: [{ rating: 5, text: "Stunning harbour views AND amazing burgers. Perfect combo." }, { rating: 4, text: "The smash burger with crispy onions is fantastic." }, { rating: 4, text: "A bit pricey but the location and quality justify it." }] },
      { id: uid(), name: "The Gladstone Hotel", reviews: [{ rating: 4, text: "Classic pub burger done properly. Good value." }, { rating: 3, text: "Average but fine for a quick meal." }, { rating: 4, text: "Great Friday night spot. Burger and beer = perfection." }] },
      { id: uid(), name: "Drummoyne Burger Bar", reviews: [{ rating: 4, text: "Great local joint with quality ingredients." }, { rating: 5, text: "The Drummoyne Special with mushrooms and Swiss cheese is unreal." }, { rating: 4, text: "Consistently excellent. My family's weekly go-to." }] },
    ],
    'Dulwich Hill': [
      { id: uid(), name: "Dullies Burgers", reviews: [{ rating: 5, text: "Absolutely nailed it. Best smash burger in the area." }, { rating: 4, text: "The double smash with special sauce is outstanding." }, { rating: 5, text: "Finally a great burger joint in Dulwich Hill!" }] },
      { id: uid(), name: "Marci Lou's Burger Co", reviews: [{ rating: 4, text: "Great food truck vibes with seriously delicious spicy chicken." }, { rating: 4, text: "Gluten-free options and great prices. Highly recommend." }, { rating: 5, text: "My favourite discovery of the year. The smash burger is unreal." }] },
      { id: uid(), name: "Phat Burger Dulwich Hill", reviews: [{ rating: 4, text: "Big, messy and absolutely delicious. Exactly what a burger should be." }, { rating: 4, text: "Great value and generous portions. Will return." }, { rating: 3, text: "Good burger but it can be a bit too heavy." }] },
      { id: uid(), name: "The Dulwich Hotel", reviews: [{ rating: 3, text: "Decent pub burger, nothing special." }, { rating: 4, text: "Good for a casual weeknight meal. Reliable." }, { rating: 3, text: "Standard pub fare. Gets the job done." }] },
      { id: uid(), name: "Stack'd Dulwich", reviews: [{ rating: 4, text: "Love the stacked smash concept here. Excellent flavour." }, { rating: 5, text: "Discovered this recently and I'm obsessed. Go try it." }, { rating: 4, text: "Great service and consistently good food." }] },
    ],
    'Erskineville': [
      { id: uid(), name: "The Erskineville Hotel", reviews: [{ rating: 4, text: "Great pub with an excellent house burger. Classic Sydney local." }, { rating: 4, text: "The Erko burger is a neighbourhood staple. Well done." }, { rating: 3, text: "Good food, great beer. Burger could be a touch juicier." }] },
      { id: uid(), name: "Village Burgers Erskineville", reviews: [{ rating: 5, text: "Small but mighty. Best burger in this pocket of the Inner West." }, { rating: 4, text: "Freshly made, perfectly seasoned. Absolutely love it." }, { rating: 5, text: "Worth walking past all the cafés for. Seriously good." }] },
      { id: uid(), name: "Smash Bros Erskineville", reviews: [{ rating: 4, text: "The double smash is a thing of beauty. Excellent technique." }, { rating: 5, text: "Best smash burger outside of Newtown. Go here now." }, { rating: 4, text: "Crispy edges, great sauce, perfect pickles. Nailed it." }] },
      { id: uid(), name: "The Royal Hotel Erskineville", reviews: [{ rating: 4, text: "Classic pub burger in a legendary venue." }, { rating: 3, text: "Decent enough. The beer garden is the real drawcard." }, { rating: 4, text: "Good honest pub burger. Solid value." }] },
      { id: uid(), name: "Patty Palace", reviews: [{ rating: 4, text: "Great concept, great execution. Love the creative toppings." }, { rating: 4, text: "The truffle aioli cheeseburger is a revelation." }, { rating: 3, text: "Good but can be inconsistent. Great when it's on point." }] },
    ],
    'Five Dock': [
      { id: uid(), name: "The Burg", reviews: [{ rating: 4, text: "The Go To burger lives up to its name. Excellent every time." }, { rating: 4, text: "Bacon Lovers burger is exactly what it sounds like — perfection." }, { rating: 5, text: "Consistently the best burger option in Five Dock." }] },
      { id: uid(), name: "Grill'd Five Dock", reviews: [{ rating: 4, text: "Great fresh ingredients. The herbed bun is a winner." }, { rating: 3, text: "Reliable option but a bit expensive for the size." }, { rating: 4, text: "Good healthy burger fix. Love the protein options." }] },
      { id: uid(), name: "Five Dock Burger Bar", reviews: [{ rating: 4, text: "Local favourite with excellent smash patties." }, { rating: 5, text: "The Five Dock Special with caramelised onions is perfection." }, { rating: 4, text: "Great staff and consistently good food." }] },
      { id: uid(), name: "Bay Burgers Five Dock", reviews: [{ rating: 3, text: "Good burger, nothing groundbreaking. Solid local option." }, { rating: 4, text: "Great portion size and good price point." }, { rating: 3, text: "Decent but not going out of my way for it." }] },
      { id: uid(), name: "The Duck Inn", reviews: [{ rating: 4, text: "Great pub vibes and a surprisingly excellent burger." }, { rating: 4, text: "The wagyu cheeseburger here punches above its weight." }, { rating: 3, text: "Good pub food. Burger is solid." }] },
    ],
    'Forest Lodge': [
      { id: uid(), name: "The Quarryman's Hotel", reviews: [{ rating: 4, text: "Historic pub with a great burger. Lovely heritage atmosphere." }, { rating: 5, text: "The Quarryman's Smash is genuinely excellent." }, { rating: 4, text: "Great hidden gem near Glebe. Well worth visiting." }] },
      { id: uid(), name: "Forest Lodge Hotel", reviews: [{ rating: 4, text: "Neighbourhood institution. The burger is always on point." }, { rating: 3, text: "Standard pub burger. Good for a casual night out." }, { rating: 4, text: "Cold pints and a great burger. Can't complain." }] },
      { id: uid(), name: "Old School Smash", reviews: [{ rating: 5, text: "Genuinely old-school technique with modern quality ingredients." }, { rating: 5, text: "Perfect smash every time. This place deserves more attention." }, { rating: 4, text: "The crispy cheese skirt on the burger is next level." }] },
      { id: uid(), name: "The Salisbury Hotel", reviews: [{ rating: 3, text: "Okay pub burger. Good for a quick bite." }, { rating: 4, text: "Better than expected. The mushroom burger option is great." }, { rating: 3, text: "Average but cheap and cheerful." }] },
      { id: uid(), name: "Lodge Burgers", reviews: [{ rating: 4, text: "Great smash concept with excellent house sauce." }, { rating: 4, text: "Always consistent, always delicious." }, { rating: 5, text: "My go-to in Forest Lodge. Never had a bad one." }] },
    ],
    'Glebe': [
      { id: uid(), name: "Soul Burger Glebe", reviews: [{ rating: 5, text: "Plant-based burgers that genuinely impress even meat lovers." }, { rating: 4, text: "The Beyond Meat patty here is staggeringly good." }, { rating: 5, text: "Best vegan burger in Sydney. Truly remarkable." }] },
      { id: uid(), name: "Glebe Point Diner", reviews: [{ rating: 4, text: "Great quality all-rounder. The burger is a highlight of the menu." }, { rating: 4, text: "Lovely local diner feel. Burger is fresh and flavourful." }, { rating: 5, text: "One of the best casual dining spots in the Inner West." }] },
      { id: uid(), name: "The Nag's Head Hotel", reviews: [{ rating: 4, text: "Classic Glebe pub with a solid burger. Great beer garden too." }, { rating: 3, text: "Good enough pub burger. Nothing special." }, { rating: 4, text: "The Nag's burger has improved a lot recently." }] },
      { id: uid(), name: "Cheeky Burgers Glebe", reviews: [{ rating: 5, text: "Outrageously good smash burgers. The double with pickles is extraordinary." }, { rating: 4, text: "Great atmosphere and even better food. Highly recommend." }, { rating: 5, text: "Criminally underrated. Best smash in Glebe." }] },
      { id: uid(), name: "The Friend in Hand Hotel", reviews: [{ rating: 3, text: "Very unique pub — the burger is okay, the experience is the star." }, { rating: 4, text: "The crayfish are the main event but the burger is decent too." }, { rating: 3, text: "Quirky spot. Food is secondary to the vibe here." }] },
    ],
    'Haberfield': [
      { id: uid(), name: "Haberfield Hotel", reviews: [{ rating: 4, text: "Great local pub, well-made burger. Solid value." }, { rating: 3, text: "Standard pub burger but reliably good." }, { rating: 4, text: "Always a consistent experience here." }] },
      { id: uid(), name: "Italian Quarter Burgers", reviews: [{ rating: 4, text: "Interesting Italian-inspired toppings. The gorgonzola burger is sublime." }, { rating: 5, text: "Who knew Italian and burgers worked so well? This place proves it." }, { rating: 4, text: "Unique flavour profiles. The pesto chicken burger is excellent." }] },
      { id: uid(), name: "Concord Smash", reviews: [{ rating: 4, text: "Excellent smash burger technique. Perfectly crispy crust." }, { rating: 4, text: "Great value for the quality on offer." }, { rating: 3, text: "Good but a bit out of the way." }] },
      { id: uid(), name: "The Rowers Restaurant", reviews: [{ rating: 4, text: "Beautiful waterfront location and great burger menu." }, { rating: 4, text: "The Rowers burger with smoked cheddar is outstanding." }, { rating: 3, text: "Great for the view. Burger is decent too." }] },
      { id: uid(), name: "Haberfield Burgers", reviews: [{ rating: 4, text: "Great local favourite. The classic cheeseburger is faultless." }, { rating: 5, text: "This place is the heart of Haberfield's food scene." }, { rating: 4, text: "Consistently excellent. Never a bad visit." }] },
    ],
    'Leichhardt': [
      { id: uid(), name: "High N' Dry", reviews: [{ rating: 5, text: "Hidden gem! Best burgers AND craft beer in the Inner West. Period." }, { rating: 5, text: "Flame-grilled wagyu is sensational. Worth every cent." }, { rating: 4, text: "Excellent weekly specials. This place keeps getting better." }] },
      { id: uid(), name: "The Sporting Globe", reviews: [{ rating: 4, text: "Great sports bar with a surprisingly excellent burger." }, { rating: 3, text: "Good value, especially during happy hour." }, { rating: 4, text: "Solid burger, great atmosphere for watching the footy." }] },
      { id: uid(), name: "Leichhardt Hotel", reviews: [{ rating: 4, text: "Classic Italian neighbourhood with a great pub burger." }, { rating: 3, text: "Decent enough. Nice outdoor area." }, { rating: 4, text: "Love coming here on game nights. Burger is always good." }] },
      { id: uid(), name: "Trattoria Leichhardt", reviews: [{ rating: 4, text: "Italian twist on a burger — mozzarella and basil pesto. Sublime." }, { rating: 5, text: "Best fusion burger concept I've encountered. Absolutely delicious." }, { rating: 4, text: "Unique and delicious. The Italian burger is a must-try." }] },
      { id: uid(), name: "Oporto Leichhardt", reviews: [{ rating: 3, text: "Good value Portuguese chicken burger. A reliable choice." }, { rating: 4, text: "The Bondi Burger here is crispy and well-seasoned." }, { rating: 3, text: "Decent fast food option. Nothing fancy but tasty." }] },
    ],
    'Lilyfield': [
      { id: uid(), name: "The Lilyfield Hotel", reviews: [{ rating: 4, text: "Great neighbourhood pub with a proper house burger." }, { rating: 4, text: "Always a solid meal here. The burger is a highlight." }, { rating: 3, text: "Decent pub food. Good for a casual night." }] },
      { id: uid(), name: "Lily's Kitchen", reviews: [{ rating: 5, text: "Incredible local café doing outstanding gourmet burgers." }, { rating: 4, text: "Fresh, quality ingredients. The chicken burger is exceptional." }, { rating: 5, text: "The best burger discovery I've made this year." }] },
      { id: uid(), name: "Rozelle Village Burgers", reviews: [{ rating: 4, text: "Great smash burgers near the Lilyfield–Rozelle border." }, { rating: 4, text: "Consistently delicious. Never disappointed." }, { rating: 3, text: "Good but can be inconsistent in quality." }] },
      { id: uid(), name: "The Fat Smash", reviews: [{ rating: 5, text: "As the name suggests — fat, smashed perfection." }, { rating: 4, text: "Love the creative topping options here." }, { rating: 5, text: "My go-to smash burger spot in this part of the Inner West." }] },
      { id: uid(), name: "Corner Patties Lilyfield", reviews: [{ rating: 4, text: "Great corner spot with excellent quality burgers." }, { rating: 3, text: "Solid option. Burger is well constructed." }, { rating: 4, text: "Friendly staff, good food, great prices." }] },
    ],
    'Marrickville': [
      { id: uid(), name: "Baby Rey's Burgers", reviews: [{ rating: 5, text: "Hands down some of the best burgers in Sydney. Stunning quality." }, { rating: 5, text: "The rustic atmosphere matches the incredible food. A must-visit." }, { rating: 4, text: "Packed every weekend for good reason. Baby Rey's is phenomenal." }] },
      { id: uid(), name: "Blazing Burgers", reviews: [{ rating: 4, text: "Great food truck, juicy and well-cooked patties." }, { rating: 4, text: "Love the smoky char on the beef. Excellent smash technique." }, { rating: 3, text: "Good burger, a little pricey for a food truck." }] },
      { id: uid(), name: "Chargrill Charlie's Marrickville", reviews: [{ rating: 4, text: "Reliable chain quality. Chicken burger is always brilliant." }, { rating: 4, text: "The chilli sauce makes this burger special." }, { rating: 4, text: "One of the best Chargrill Charlie's locations." }] },
      { id: uid(), name: "Smash City Marrickville", reviews: [{ rating: 5, text: "Incredible smash burgers in a great industrial space." }, { rating: 4, text: "Perfect patty execution every single time." }, { rating: 5, text: "Marrickville's smash burger king. Absolutely nailed it." }] },
      { id: uid(), name: "The Marrickville Hotel", reviews: [{ rating: 3, text: "Standard pub burger. Fine for a casual meal." }, { rating: 4, text: "The burger has improved a lot. Good value." }, { rating: 3, text: "Good pub food, nothing extraordinary." }] },
    ],
    'Newtown': [
      { id: uid(), name: "Mary's Newtown", reviews: [{ rating: 5, text: "A Sydney institution. The Mary's burger is simple, dirty, perfect." }, { rating: 5, text: "Cult status for a reason. Loud, fun and the burgers are elite." }, { rating: 5, text: "Best burger in the Inner West, arguably all of Sydney." }, { rating: 4, text: "Long queues but absolutely worth it every single time." }] },
      { id: uid(), name: "Down N Out", reviews: [{ rating: 5, text: "Incredible American smash burgers. The DnO Classic is perfection." }, { rating: 5, text: "The shoestring fries and burger combo is unbeatable." }, { rating: 4, text: "Loud, fun atmosphere. The burgers are genuinely world-class." }] },
      { id: uid(), name: "Big Daddy's Burger Bar", reviews: [{ rating: 4, text: "Great casual spot with creative toppings and quality beef." }, { rating: 5, text: "The Big Daddy with jalapeños is extraordinary. A must." }, { rating: 4, text: "Reliably brilliant. One of Newtown's best." }] },
      { id: uid(), name: "Soul Burger Newtown", reviews: [{ rating: 4, text: "Outstanding plant-based burgers. The OG Soul is remarkable." }, { rating: 4, text: "Best vegan option in Newtown. Even meat-eaters love this." }, { rating: 5, text: "Proves plant-based can be absolutely delicious." }] },
      { id: uid(), name: "Don Rodney's at The Townie", reviews: [{ rating: 4, text: "California-style burgers in a great King St pub. Excellent." }, { rating: 4, text: "The Townie burger with crispy chicken skin is unique and tasty." }, { rating: 3, text: "Good pub burger with an interesting twist. Worth trying." }] },
    ],
    'Petersham': [
      { id: uid(), name: "SuBURGia Petersham", reviews: [{ rating: 5, text: "Celebrating Sydney's suburbs as burgers — what a concept. Brilliant execution." }, { rating: 4, text: "The Epping wagyu cheeseburger is extraordinary." }, { rating: 5, text: "Most creative burger concept in the city. Every burger is a suburb." }] },
      { id: uid(), name: "Frango Petersham", reviews: [{ rating: 4, text: "Best Portuguese chicken burger outside of Portugal." }, { rating: 5, text: "The peri-peri spice level and crispy skin is perfection." }, { rating: 4, text: "Incredible value. The chicken burger here sets the standard." }] },
      { id: uid(), name: "Lox in a Box", reviews: [{ rating: 4, text: "Incredible chicken burger concept that moonlights after 5pm." }, { rating: 5, text: "The chicken burger here is legitimately one of Sydney's best." }, { rating: 4, text: "Creative and delicious. The dill pickle combination is inspired." }] },
      { id: uid(), name: "The Federal Hotel", reviews: [{ rating: 3, text: "Decent pub burger. Good location and cold beers." }, { rating: 4, text: "The Federal burger with fried onions is surprisingly good." }, { rating: 3, text: "Fine for a pub meal. Nothing exceptional." }] },
      { id: uid(), name: "Petersham Smash", reviews: [{ rating: 4, text: "Great smash technique, perfectly seasoned patty." }, { rating: 4, text: "Solid local option. The double smash is excellent." }, { rating: 4, text: "Consistent and delicious. My regular Petersham stop." }] },
    ],
    'Rozelle': [
      { id: uid(), name: "Eat at Rob's", reviews: [{ rating: 5, text: "Rob's double cheeseburger is one of the finest in all of Sydney." }, { rating: 5, text: "Brisket and chuck blend is perfect. The cheese pull is outrageous." }, { rating: 5, text: "A Rozelle institution. This is what burgers should aspire to." }] },
      { id: uid(), name: "The Green Lion Bistro", reviews: [{ rating: 4, text: "Beautiful plant-based pub grub on Darling St. The Green Mack is a winner." }, { rating: 4, text: "Love this place. Vegan burgers done with real care and creativity." }, { rating: 5, text: "Best plant-based burger pub in Sydney. The owner is wonderful." }] },
      { id: uid(), name: "Chebbo's Burgers", reviews: [{ rating: 5, text: "Hidden smash burger gem in the Inner West. Absolutely phenomenal." }, { rating: 4, text: "The special sauce here is deeply addictive. Incredible burger." }, { rating: 5, text: "Word is finally getting out about this place. Rightfully so." }] },
      { id: uid(), name: "The Rozelle Hotel", reviews: [{ rating: 4, text: "Great Darling St pub with a well-executed burger on the menu." }, { rating: 3, text: "Decent pub burger. Good for a Sunday session." }, { rating: 4, text: "Love this pub. The burger is better than most." }] },
      { id: uid(), name: "Darling St Smash", reviews: [{ rating: 4, text: "Great smash burger right on the main strip." }, { rating: 4, text: "Perfectly executed double patty. Excellent flavour." }, { rating: 3, text: "Good but gets very busy. Worth the wait." }] },
    ],
    'St Peters': [
      { id: uid(), name: "The St Peters Hotel", reviews: [{ rating: 4, text: "Great local pub with a better-than-average burger." }, { rating: 4, text: "Solid pub burger. The mushroom Swiss option is excellent." }, { rating: 3, text: "Fine for a casual meal. The beer selection is better than the food." }] },
      { id: uid(), name: "Factory Burgers", reviews: [{ rating: 5, text: "Industrial setting, artisan burgers. The contrast works beautifully." }, { rating: 4, text: "Great quality ingredients and bold flavour combinations." }, { rating: 5, text: "St Peters' best kept secret. Outstanding burgers." }] },
      { id: uid(), name: "Corner Smash St Peters", reviews: [{ rating: 4, text: "Excellent smash burgers, crispy edges, great sauce." }, { rating: 4, text: "Friendly staff and consistently high quality." }, { rating: 4, text: "Love this place. My go-to in St Peters." }] },
      { id: uid(), name: "The Landmark Hotel", reviews: [{ rating: 4, text: "Classic old pub with a solid burger offering." }, { rating: 3, text: "Average pub fare but fine for a quick meal." }, { rating: 4, text: "The Landmark burger with bacon and egg is a weekend treat." }] },
      { id: uid(), name: "Union Burgers", reviews: [{ rating: 4, text: "Well-constructed burgers with quality local produce." }, { rating: 4, text: "Love the Union Double with pickled jalapeños." }, { rating: 5, text: "Excellent concept and even better execution. Highly recommend." }] },
    ],
    'Summer Hill': [
      { id: uid(), name: "The Terminus Hotel", reviews: [{ rating: 4, text: "Heritage pub with a great burger. A Summer Hill staple." }, { rating: 4, text: "The Terminus burger with caramelised onions is excellent." }, { rating: 3, text: "Solid pub meal. Good value." }] },
      { id: uid(), name: "Flour Drum", reviews: [{ rating: 5, text: "Incredible café that does the most amazing gourmet burger." }, { rating: 4, text: "Great coffee and an even better smash burger." }, { rating: 5, text: "The best lunch spot in Summer Hill by a mile." }] },
      { id: uid(), name: "Summer Hill Burger Bar", reviews: [{ rating: 4, text: "Great local option with solid smash technique." }, { rating: 4, text: "Consistently good. The double with pickles is brilliant." }, { rating: 4, text: "Friendly staff and excellent ingredients." }] },
      { id: uid(), name: "Hilltop Smash", reviews: [{ rating: 4, text: "Great view and even better burgers up here." }, { rating: 5, text: "The Hilltop Double with truffle aioli is extraordinary." }, { rating: 4, text: "Hidden gem in Summer Hill. More people need to know about this." }] },
      { id: uid(), name: "The Summer Hotel", reviews: [{ rating: 3, text: "Standard pub burger. Fine for a local feed." }, { rating: 4, text: "Better than expected. The wagyu option is worth the upgrade." }, { rating: 3, text: "Decent but not going out of my way for it." }] },
    ],
    'Sydenham': [
      { id: uid(), name: "The Wheatsheaf Hotel", reviews: [{ rating: 4, text: "Great heritage pub with a surprisingly excellent burger." }, { rating: 4, text: "Love this spot. The burger is one of the area's best." }, { rating: 3, text: "Good pub food. Burger is solid." }] },
      { id: uid(), name: "Platform Burgers", reviews: [{ rating: 5, text: "Named after the station, and worth making a stop for." }, { rating: 4, text: "Excellent smash burgers with great creative toppings." }, { rating: 5, text: "Best burger near the station. Absolute gem." }] },
      { id: uid(), name: "The Sydenham Hotel", reviews: [{ rating: 3, text: "Standard pub fare. The burger does the job." }, { rating: 4, text: "Solid value. The double smash option is worth it." }, { rating: 3, text: "Fine for a quick meal near the train." }] },
      { id: uid(), name: "Station Grill Sydenham", reviews: [{ rating: 4, text: "Great charcoal-grilled burgers. Unique in the area." }, { rating: 4, text: "The smoky flavour profile sets it apart from other spots." }, { rating: 4, text: "Excellent quality at reasonable prices." }] },
      { id: uid(), name: "Inner West Patties", reviews: [{ rating: 4, text: "Great smash concept with quality ingredients." }, { rating: 4, text: "Love the house-made sauce. Excellent value." }, { rating: 5, text: "The best smash burger find in Sydenham." }] },
    ],
    'Tempe': [
      { id: uid(), name: "The Tempe Hotel", reviews: [{ rating: 4, text: "Great local pub burger. Always a solid choice." }, { rating: 3, text: "Standard pub fare but reliable." }, { rating: 4, text: "Love the atmosphere here on a Friday night. Burger is great." }] },
      { id: uid(), name: "South Side Burgers", reviews: [{ rating: 5, text: "Incredible hidden smash burger joint. Tempe's best kept secret." }, { rating: 4, text: "Perfect patty technique. The double is outstanding." }, { rating: 5, text: "Finally, a great burger spot south of Newtown." }] },
      { id: uid(), name: "The Workshop Grill", reviews: [{ rating: 4, text: "Industrial chic setting with genuinely excellent burgers." }, { rating: 4, text: "Great quality and generous portions. Highly recommend." }, { rating: 4, text: "The Workshop Wagyu is a must-order." }] },
      { id: uid(), name: "Airport Smash", reviews: [{ rating: 4, text: "Brilliant smash burgers just minutes from the airport." }, { rating: 3, text: "Good for a pre-flight or post-flight feed." }, { rating: 4, text: "Consistently great. Always hits the spot." }] },
      { id: uid(), name: "Tempe Burger Bar", reviews: [{ rating: 4, text: "Great local institution. The Tempe Classic is a must-try." }, { rating: 4, text: "Solid ingredients, well-executed. Great value." }, { rating: 3, text: "Good but unremarkable. Decent local option." }] },
    ],
  };
  Object.entries(seed).forEach(([suburb, stores]) => {
    data[suburb] = stores;
  });
  save();
}

// ===== HELPERS =====
function uid() {
  return Math.random().toString(36).slice(2, 9);
}

function save() {
  localStorage.setItem('burgerData', JSON.stringify(data));
}

function avgRating(reviews) {
  if (!reviews.length) return 0;
  return reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;
}

function starsHTML(rating, size = 'normal') {
  const full = Math.round(rating);
  return '★'.repeat(full) + '☆'.repeat(5 - full);
}

function escapeHTML(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// ===== DOM REFS =====
const suburbSidebar  = document.getElementById('suburbSidebar');
const suburbSelect   = document.getElementById('suburbSelect');
const addSuburbBtn   = document.getElementById('addSuburbBtn');
const suburbModal    = document.getElementById('suburbModal');
const newSuburbInput = document.getElementById('newSuburbInput');
const confirmSuburb  = document.getElementById('confirmSuburb');
const cancelSuburb   = document.getElementById('cancelSuburb');

const storeSection   = document.getElementById('storeSection');
const suburbTitle    = document.getElementById('suburbTitle');
const storeList      = document.getElementById('storeList');
const noStores       = document.getElementById('noStores');
const addStoreBtn    = document.getElementById('addStoreBtn');

const storeModal     = document.getElementById('storeModal');
const newStoreName   = document.getElementById('newStoreName');
const newStoreReview = document.getElementById('newStoreReview');
const confirmStore   = document.getElementById('confirmStore');
const cancelStore    = document.getElementById('cancelStore');
const starInput      = document.getElementById('starInput');

const reviewModal    = document.getElementById('reviewModal');
const reviewStoreName = document.getElementById('reviewStoreName');
const reviewText     = document.getElementById('reviewText');
const reviewStarInput = document.getElementById('reviewStarInput');
const confirmReview  = document.getElementById('confirmReview');
const cancelReview   = document.getElementById('cancelReview');

let activeReviewStoreId = null;
let selectedSuburb = null;

// ===== POPULATE SIDEBAR =====
function populateSidebar() {
  suburbSidebar.innerHTML = '';
  INNER_WEST.forEach(s => {
    const li = document.createElement('li');
    li.textContent = s;
    if (s === selectedSuburb) li.classList.add('active');
    li.addEventListener('click', () => {
      selectSuburb(s);
    });
    suburbSidebar.appendChild(li);
  });
}

// ===== SHARED SUBURB SELECTION =====
function selectSuburb(name) {
  selectedSuburb = name;
  suburbSelect.value = name;
  renderStores(name);
  populateSidebar();
}

// ===== POPULATE SUBURB SELECT =====
function populateSuburbs() {
  const suburbs = Object.keys(data).sort();
  suburbSelect.innerHTML = '<option value="">-- Choose a suburb --</option>';
  suburbs.forEach(s => {
    const opt = document.createElement('option');
    opt.value = s;
    opt.textContent = s;
    if (s === selectedSuburb) opt.selected = true;
    suburbSelect.appendChild(opt);
  });
}

// ===== RENDER STORES =====
function renderStores(suburb) {
  selectedSuburb = suburb;
  suburbTitle.textContent = `🏙️ ${suburb}`;
  storeSection.classList.remove('hidden');
  storeList.innerHTML = '';

  const stores = data[suburb] || [];

  // Sort by average rating descending
  const sorted = [...stores].sort((a, b) => avgRating(b.reviews) - avgRating(a.reviews));

  if (sorted.length === 0) {
    noStores.classList.remove('hidden');
  } else {
    noStores.classList.add('hidden');
    sorted.forEach(store => {
      storeList.appendChild(buildCard(store));
    });
  }
}

function buildCard(store) {
  const avg = avgRating(store.reviews);
  const card = document.createElement('div');
  card.className = 'store-card';
  card.dataset.id = store.id;

  const reviewsHTML = store.reviews.map(r => `
    <div class="review-item">
      <span class="r-stars">${starsHTML(r.rating)}</span>${escapeHTML(r.text)}
    </div>
  `).join('');

  card.innerHTML = `
    <div class="store-name">${escapeHTML(store.name)}</div>
    <div class="store-avg">
      <span class="stars-display">${starsHTML(avg)}</span>
      <span class="avg-number">${avg.toFixed(1)}</span>
    </div>
    <div class="review-count">${store.reviews.length} review${store.reviews.length !== 1 ? 's' : ''}</div>
    ${store.reviews.length ? `<div class="reviews-list">${reviewsHTML}</div>` : ''}
    <div class="store-card-footer">
      <button class="btn btn-primary btn-sm review-btn" data-id="${store.id}">+ Review</button>
    </div>
  `;

  return card;
}

// ===== STAR INPUT WIDGET =====
function initStarWidget(container) {
  container.dataset.rating = 0;
  const spans = container.querySelectorAll('span');

  spans.forEach(span => {
    span.addEventListener('mouseover', () => highlightStars(container, parseInt(span.dataset.val)));
    span.addEventListener('mouseout',  () => highlightStars(container, parseInt(container.dataset.rating)));
    span.addEventListener('click',     () => {
      container.dataset.rating = span.dataset.val;
      highlightStars(container, parseInt(span.dataset.val));
    });
  });
}

function highlightStars(container, val) {
  container.querySelectorAll('span').forEach(s => {
    s.classList.toggle('active', parseInt(s.dataset.val) <= val);
  });
}

function resetStarWidget(container) {
  container.dataset.rating = 0;
  highlightStars(container, 0);
}

// ===== MODAL HELPERS =====
function openModal(modal) { modal.classList.remove('hidden'); }
function closeModal(modal) { modal.classList.add('hidden'); }

// ===== SUBURB MODAL =====
addSuburbBtn.addEventListener('click', () => {
  newSuburbInput.value = '';
  openModal(suburbModal);
  newSuburbInput.focus();
});

cancelSuburb.addEventListener('click', () => closeModal(suburbModal));
suburbModal.addEventListener('click', e => { if (e.target === suburbModal) closeModal(suburbModal); });

confirmSuburb.addEventListener('click', () => {
  const name = newSuburbInput.value.trim();
  if (!name) { newSuburbInput.focus(); return; }
  if (data[name]) {
    alert(`"${name}" already exists!`);
    return;
  }
  data[name] = [];
  save();
  populateSuburbs();
  populateSidebar();
  selectSuburb(name);
  closeModal(suburbModal);
});

newSuburbInput.addEventListener('keydown', e => { if (e.key === 'Enter') confirmSuburb.click(); });

// ===== SUBURB SELECT =====
suburbSelect.addEventListener('change', () => {
  const val = suburbSelect.value;
  if (val) selectSuburb(val);
  else storeSection.classList.add('hidden');
});

// ===== STORE MODAL =====
addStoreBtn.addEventListener('click', () => {
  newStoreName.value = '';
  newStoreReview.value = '';
  resetStarWidget(starInput);
  openModal(storeModal);
  newStoreName.focus();
});

cancelStore.addEventListener('click', () => closeModal(storeModal));
storeModal.addEventListener('click', e => { if (e.target === storeModal) closeModal(storeModal); });

confirmStore.addEventListener('click', () => {
  const name   = newStoreName.value.trim();
  const rating = parseInt(starInput.dataset.rating);
  const review = newStoreReview.value.trim();

  if (!name) { newStoreName.focus(); return; }
  if (!rating) { alert('Please give a star rating!'); return; }
  if (!review) { newStoreReview.focus(); return; }

  const store = { id: uid(), name, reviews: [{ rating, text: review }] };
  data[selectedSuburb].push(store);
  save();
  renderStores(selectedSuburb);
  closeModal(storeModal);
});

// ===== REVIEW MODAL =====
storeList.addEventListener('click', e => {
  const btn = e.target.closest('.review-btn');
  if (!btn) return;
  const storeId = btn.dataset.id;
  const store = data[selectedSuburb].find(s => s.id === storeId);
  if (!store) return;

  activeReviewStoreId = storeId;
  reviewStoreName.textContent = store.name;
  reviewText.value = '';
  resetStarWidget(reviewStarInput);
  openModal(reviewModal);
  reviewText.focus();
});

cancelReview.addEventListener('click', () => closeModal(reviewModal));
reviewModal.addEventListener('click', e => { if (e.target === reviewModal) closeModal(reviewModal); });

confirmReview.addEventListener('click', () => {
  const rating = parseInt(reviewStarInput.dataset.rating);
  const text   = reviewText.value.trim();

  if (!rating) { alert('Please give a star rating!'); return; }
  if (!text)   { reviewText.focus(); return; }

  const store = data[selectedSuburb].find(s => s.id === activeReviewStoreId);
  if (!store) return;

  store.reviews.push({ rating, text });
  save();
  renderStores(selectedSuburb);
  closeModal(reviewModal);
});

// ===== KEYBOARD CLOSE =====
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeModal(suburbModal);
    closeModal(storeModal);
    closeModal(reviewModal);
  }
});

// ===== INIT =====
initStarWidget(starInput);
initStarWidget(reviewStarInput);
populateSuburbs();
populateSidebar();
