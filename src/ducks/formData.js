import staticCategories from "../statics/categories.json"
import merge from 'deepmerge'


const SETVALUE = "SETVALUE";
const UPDATEARRAY = "UPDATEARRAY";

//action creators
export const setValue = (value, key1, key2 = null, key3 = null) => {
  return {
    type: SETVALUE,
    payload: buildVariantDynamicObject(value, key1, key2, key3)
  };
};

export const updateInArray = (index, value, key1, key2 = null, key3 = null) => {
  return {
    type: UPDATEARRAY,
    payload: {
      index: index,
      value: value,
      key1: key1,
      key2: key2,
      key3: key3
    }
  };
};

function buildVariantDynamicObject(value, key1, key2, key3) {
  if (key3){
    return {
      [key1]: {
        [key2]: {
          [key3]: value
        }
      }
    };
  }
  if (key2){
    return {
      [key1]: {
        [key2]: value
      }
    };
  }
  return {
    [key1]: value
  }
}

//reducer


export default (state = initialState(), action) => {
  let { type, payload } = action;
  switch (type) {
    case SETVALUE:
      return merge(state, payload);
    case UPDATEARRAY:
      let newState = merge(state);
      updateValue(payload, newState);
      return newState;
    default:
      return state;
  }
};

function updateValue(payload, newState) {
  if (payload.key3) {
    newState[payload.key3][payload.key2][payload.key1][payload.index] = payload.value;
  }
  if (payload.key2) {
    newState[payload.key2][payload.key1][payload.index] = payload.value;
  }
  newState[payload.key1][payload.index] = payload.value;
}

function initialState() {
  let initialCategories = [];
  console.log(staticCategories.categories);
  for (let cat in staticCategories.categories) {
    initialCategories.push({
      category: {
        group: "",
        number: 0,
        name: "",
        totalCount: 0,
        threatAssessmentCounts: {
          shinyCount: 0,
          closedLoopCount: 0,
          openContainerCount: 0,
          fouledCount: 0
        },
        notes: "",
        weight: 0,
        weightUnit: ""
      }
    });
  }

  return {
    summary: {
      leader: "",
      organization: "",
      weather: "",
      date: "",
      hoursSpent: "",
      litterPickupVolunteers: "",
      litterCountingVolunteers: ""
    },
    siteInfo: {
      siteName: "",
      overallSiteBoundary: [],
      boundaryNotes: "",
      totalSiteArea: ""
    },
    siteConditions: {
      trash: ""
    },
    weightAssessment: {
      totalWeight: 0,
      garbageWeight: 0,
      recycleWeight: 0,
    },
    categories: initialCategories
  };
}
