import { parseAndConvertTimestamp } from '../lib/dateConverter.mjs';

export function parseSailings(schedules) {
    
        schedules.forEach((schedule, index) => {
            console.log(`Schedule ID: ${schedule.ScheduleID}, Route ID: ${schedule.RouteID}, Description: ${schedule.SailingDescription}`);
            schedule.Journs.forEach(journey => {
                console.log(journey.VesselName);
                journey.TerminalTimes.forEach(terminalTime => {
                    console.log(terminalTime.TerminalDescription, terminalTime.Time);
                });
            });
    
        });
    };
