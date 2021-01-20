export let tuesFridSchedule = [


    {
        periodName: "Period 5",
        startTime: "7:30 AM",
        endTime: "8:50 AM",
    }, {
        periodName: "Passing Period",
        startTime: "8:50 AM",
        endTime: "9:00 AM",
        isPassing: true
    },
    {
        periodName: "Smart",
        startTime: "9:00 AM",
        endTime: "9:35 AM",
    }, {
        periodName: "Passing Period",
        startTime: "9:35 AM",
        endTime: "9:45 AM",
        isPassing: true
    }, {
        periodName: "Period 6",
        startTime: "9:45 AM",
        endTime: "11:05 AM",
    },
    {
        periodName: "Passing Period",
        startTime: "11:05 AM",
        endTime: "11:05 AM",
        isPassing: true
    },
    {
        periodName: "Lunch Break",
        startTime: "11:05 AM",
        endTime: "11:45 AM",
    },
    {
        periodName: "Passing Period",
        startTime: "11:45 AM",
        endTime: "11:55 AM",
        isPassing: true
    }, 
    {
        periodName: "Period 7",
        startTime: "11:55 AM",
        endTime: "1:15 PM",
    },
    {
        periodName: "Passing Period",
        startTime: "1:15 PM",
        endTime: "1:20 PM",
        isPassing: true
    }, 
    {
        periodName: "Tiered Interventions",
        startTime: "1:20 PM",
        endTime: "2:00 PM",
    }

    
]

export let monThurSchedule = [


    {
        periodName: "Period 1",
        startTime: "7:30 AM",
        endTime: "8:50 AM",
    }, {
        periodName: "Passing Period",
        startTime: "8:50 AM",
        endTime: "9:00 AM",
        isPassing: true
    },
    {
        periodName: "Period 2",
        startTime: "9:00 AM",
        endTime: "10:20 AM",
    },
    {
        periodName: "Passing Period",
        startTime: "10:20 AM",
        endTime: "10:30 AM",
        isPassing: true
    },
    {
        periodName: "Period 3",
        startTime: "10:30 AM",
        endTime: "11:50 AM",
      
    }, {
        periodName: "Passing Period",
        startTime: "11:50 AM",
        endTime: "11:50 AM",
        isPassing: true
    }, 
    {
        periodName: "Lunch Break",
        startTime: "11:50 AM",
        endTime: "12:30 PM",
      
    }, {
        periodName: "Passing Period",
        startTime: "12:30 PM",
        endTime: "12:40 PM",
        isPassing: true
    }, 
    {
        periodName: "Period 4",
        startTime: "12:40 PM",
        endTime: "2:00 PM",
    }

    
]

// export let wedSchedule = [
//     {
//         periodName: "Period 1",
//         startTime: "7:30 AM",
//         endTime: "8:12 AM",
//     }, {
//         periodName: "Passing Period",
//         startTime: "8:12 AM",
//         endTime: "8:22 AM",
//         isPassing: true
//     },
//     {
//         periodName: "Period 2",
//         startTime: "8:22 AM",
//         endTime: "9:03 AM",
//     },
//     {
//         periodName: "Passing Period",
//         startTime: "9:03 AM",
//         endTime: "9:13 AM",
//         isPassing: true
//     },
//     {
//         periodName: "Period 3",
//         startTime: "9:13 AM",
//         endTime: "9:54 AM",
//     },
//     {
//         periodName: "Passing Period",
//         startTime: "9:54 AM",
//         endTime: "10:04 AM",
//         isPassing: true
//     },
//     {
//         periodName: "Period 4",
//         startTime: "10:04 AM",
//         endTime: "10:45 AM",
//     },
//     {
//         periodName: "Passing Period",
//         startTime: "10:45 AM",
//         endTime: "10:55 AM",
//         isPassing: true
//     },
//     {
//         periodName: "Period 5",
//         startTime: "10:55 AM",
//         endTime: "11:36 AM",
//     },
//     {
//         periodName: "Passing Period",
//         startTime: "11:36 AM",
//         endTime: "11:36 AM",
//         isPassing: true
//     }, {
//         periodName: "Lunch Break",
//         startTime: "11:36 AM",
//         endTime: "12:16 PM",
//     },  {
//         periodName: "Passing Period",
//         startTime: "12:16 PM",
//         endTime: "12:26 PM",
//         isPassing: true
//     },

//     {
//         periodName: "Period 6",
//         startTime: "12:26 PM",
//         endTime: "1:08 PM",
//     },
//     {
//         periodName: "Passing Period",
//         startTime: "1:08 PM",
//         endTime: "1:18 PM",
//         isPassing: true
//     },
//     {
//         periodName: "Period 7",
//         startTime: "1:18 PM",
//         endTime: "2:00 PM",
//     },

// ]
export let specialSchedule = [


    {
        periodName: "Period 1",
        startTime: "7:30 AM",
        endTime: "8:55 AM",
    }, {
        periodName: "Passing Period",
        startTime: "8:55 AM",
        endTime: "9:02 AM",
        isPassing: true
    },
    {
        periodName: "Period 2",
        startTime: "9:02 AM",
        endTime: "10:27 AM",
    },
    {
        periodName: "Passing Period",
        startTime: "10:27 AM",
        endTime: "10:27 AM",
        isPassing: true
    },
    {
        periodName: "Period 3",
        startTime: "10:27 AM",
        endTime: "12:29 PM",
        lunchPeriods: {
            A: {
                startTime: "10:27 AM",
                endTime: "10:57 AM"
            },
            B: {
                startTime: "11:13 AM",
                endTime: "11:43 AM"
            },
            C: {
                startTime: "11:59 AM",
                endTime: "12:29 PM"
            },
        }
    }, {
        periodName: "Passing Period",
        startTime: "12:29 AM",
        endTime: "12:36 AM",
        isPassing: true
    }, 
    {
        periodName: "Period 4",
        startTime: "12:36 PM",
        endTime: "2:00 PM",
    }
]


// export let specialSchedule = [

//     {
//         periodName: "Period 1",
//         startTime: "7:30 AM",
//         endTime: "8:13 AM",
//     }, {
//         periodName: "Passing Period",
//         startTime: "8:13 AM",
//         endTime: "8:20 AM",
//         isPassing: true
//     },
//     {
//         periodName: "Period 2",
//         startTime: "8:20 AM",
//         endTime: "9:02 AM",
//     },
//     {
//         periodName: "Passing Period",
//         startTime: "9:02 AM",
//         endTime: "9:09 AM",
//         isPassing: true
//     },
//     {
//         periodName: "Period 3",
//         startTime: "9:09 AM",
//         endTime: "9:51 AM",
//     },
//     {
//         periodName: "Passing Period",
//         startTime: "9:51 AM",
//         endTime: "9:58 AM",
//         isPassing: true
//     },
//     {
//         periodName: "Period 4",
//         startTime: "9:58 AM",
//         endTime: "10:40 AM",
//     },
//     {
//         periodName: "Passing Period",
//         startTime: "10:40 AM",
//         endTime: "10:40 AM",
//         isPassing: true
//     },
//     {
//         periodName: "Period 5",
//         startTime: "10:40 AM",
//         endTime: "12:20 PM",
//         lunchPeriods: {
//             A: {
//                 startTime: "10:40 AM",
//                 endTime: "11:11 AM"
//             },
//             B: {
//                 startTime: "11:15 AM",
//                 endTime: "11:45 AM"
//             },
//             C: {
//                 startTime: "11:50 AM",
//                 endTime: "12:20 PM"
//             },
//         }
//     },  {
//         periodName: "Passing Period",
//         startTime: "12:20 PM",
//         endTime: "12:27 PM",
//         isPassing: true
//     },

//     {
//         periodName: "Period 6",
//         startTime: "12:27 PM",
//         endTime: "1:09 PM",
//     },
//     {
//         periodName: "Passing Period",
//         startTime: "1:09 PM",
//         endTime: "1:16 PM",
//         isPassing: true
//     },
//     {
//         periodName: "Period 7",
//         startTime: "1:16 PM",
//         endTime: "2:00 PM",
//     },

    

    
    

// ]

export let weekendSchedule = [

    
]



