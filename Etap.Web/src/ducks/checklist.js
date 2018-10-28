const CHECKED = 'CHECKED';


export const itemListObj = [{ type: "Bags", id: 0 },
{ type: "Cups", id: 1 },
{ type: "Beverages & Food Cartons", id: 2 },
{ type: "Other Disposable Food Serviceware Items (plates, to go)", id: 3 },
{ type: "Food and Other Product Packaging", id: 4 },
{ type: "Cardboard (corrugated)", id: 5 },
{ type: "Paper and paper pieces (any size)", id: 6 },
{ type: "Beverages Bottles and Containers", id: 7 },
{ type: "Food and Other Product Packaging", id: 8 },
{ type: "Glass fragments (= 2.5 cm) - packaging/containers/unidentifiable", id: 9 },
{ type: "Glass fragments (<2.5 cm)", id: 10 },
{ type: "Beverage Cans and Containers", id: 11 },
{ type: "Bottle Caps and Beverage Packaging", id: 12 },
{ type: "Food and Other Product Packaging", id: 13 },
{ type: "Metal pieces (=2.5 cm) - packaging/containers/unidentifiable", id: 14 },
{ type: "Metal pieces (<2.5 cm)", id: 15 },
{ type: "Bags", id: 16 },
{ type: "Beverage Bottles and Containers", id: 17 },
{ type: "Straws and Stirrers", id: 18 },
{ type: "Bottle Caps", id: 19 },
{ type: "Other Beverage Packaging (Lids, seals..)", id: 20 },
{ type: "Disposable Food Serviceware Items (cups, utensils, plates...)", id: 21 },
{ type: "Food Wrappers/Pouches", id: 22 },
{ type: "Other Food and Other Product Packaging", id: 23 },
{ type: "Fragments/Pieces (=2.5 cm) -", id: 24 },
{ type: "Fragments/Pieces (<2.5 cm)", id: 25 },
{ type: "Cigarettes/Cannabis butts, ends, filters", id: 26 },
{ type: "Smoking/drug paraphernalia", id: 27 },
{ type: "Sharps ñ medical/drug/personal (Please put in sharps container)", id: 28 },
{ type: "Sharps ñ fishing/recreational/other", id: 29 },
{ type: " Medical Waste/Supplies (non-sharps)", id: 30 },
{ type: "Toiletries/Personal Products", id: 31 },
{ type: "Textiles and Shoes", id: 32 },
{ type: "Electronics", id: 33 },
{ type: "Entertainment/Recreation Items", id: 34 },
{ type: "Household/camping items", id: 35 },
{ type: "Commercial/industrial/office/agricultural items", id: 36 },
{ type: "Construction and Demolition Debris - wood", id: 37 },
{ type: "Paint, Chemical Containers and Other Hazardous", id: 38 },
{ type: "Fishing/Maritime Gear", id: 39 },
{ type: "Vehicle/Vessel Parts", id: 40 },
{ type: "Furniture/carpet and other bulky Items (Please write in under notes)", id: 41 },
{ type: "Foamed pieces/fragments of docks, floats", id: 42 },
{ type: "Illegal Dumping - Whole Bags of Trash", id: 43 },
{ type: "Organic Matter/Items", id: 44 }]

//action creators
export const checked = (listItem, boolean) => ({
  type: CHECKED,
  payload: { [listItem]: !boolean },
});


//reducer

const initialState = { foo: false, bar: false, baz: false }

export default (state = initialState, action) => {

  let { type, payload } = action;

  switch (type) {
    case CHECKED: return { ...state, ...payload }
    default: return state;
  }

};