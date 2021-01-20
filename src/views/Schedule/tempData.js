export let monWedSchedule = [


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




export let tuesThurSchedule = [


    {
        periodName: "Period 5",
        startTime: "7:30 AM",
        endTime: "8:55 AM",
    }, {
        periodName: "Passing Period",
        startTime: "8:55 AM",
        endTime: "9:02 AM",
        isPassing: true
    },
    {
        periodName: "SMART Period",
        startTime: "9:02 AM",
        endTime: "9:35 AM",
    },
    {
        periodName: "Passing Period",
        startTime: "9:35 AM",
        endTime: "9:42 AM",
        isPassing: true
    },
    {
      periodName: "Period 6",
      startTime: "9:42 AM",
      endTime: "11:07 AM"
    },
    {
      periodName: "Passing Period",
      startTime: "11:07 AM",
      endTime: "11:07 AM",
      isPassing: true
    },
    {
        periodName: "Period 7",
        startTime: "11:07 AM",
        endTime: "1:09 PM",
        lunchPeriods: {
            A: {
                startTime: "11:07 AM",
                endTime: "11:37 AM"
            },
            B: {
                startTime: "11:53 AM",
                endTime: "12:23 PM"
            },
            C: {
                startTime: "12:39 PM",
                endTime: "1:09 PM"
            },
        }
    }, {
        periodName: "Passing Period",
        startTime: "1:09 PM",
        endTime: "1:16 PM",
        isPassing: true
    }, 
    {
        periodName: "Tiered Interventions",
        startTime: "1:16 PM",
        endTime: "2:00 PM",
    }
]


export let weekendSchedule = [

    
]