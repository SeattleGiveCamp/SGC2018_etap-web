const FORMUPDATE = "FORMUPDATE";

//action creators
export const actionCreator = (value, key1, key2 = null, key3 = null) => {
  return {
    type: FORMUPDATE,
    payload: {
      [key1]: {
        [key2]: value
      }
    }
  };
};
// onchange={(value) => actionCreator(value, "summary", "leader")}
// onchange={(value) => actionCreator(value, "siteInfo", "siteName")}

//reducer

const initialState = {
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
  weightAssessment: {},
  categories: [{
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
  }]
};


export default (state = initialState, action) => {
  let { type, payload } = action;
  console.log("hello")
  switch (type) {
    case FORMUPDATE:
      return { ...state, ...payload };
    default:
      return state;
  }
};
