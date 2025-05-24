
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const SessionsTab = () => {
  const upcomingSessions = [
    {
      id: 1,
      therapist: "Dr. Sarah Johnson",
      date: "May 15, 2023",
      time: "2:00 PM - 3:00 PM",
      type: "Video Call"
    },
    {
      id: 2,
      therapist: "Dr. Michael Chen",
      date: "May 22, 2023",
      time: "10:00 AM - 11:00 AM",
      type: "Video Call"
    }
  ];
  
  const pastSessions = [
    {
      id: 3,
      therapist: "Dr. Sarah Johnson",
      date: "May 1, 2023",
      time: "2:00 PM - 3:00 PM",
      type: "Video Call",
      notes: "Discussed anxiety management techniques"
    },
    {
      id: 4,
      therapist: "Dr. Sarah Johnson",
      date: "April 24, 2023",
      time: "2:00 PM - 3:00 PM",
      type: "Video Call",
      notes: "Initial consultation"
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-black-gradient border border-white/5 shadow-dark-glow">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Upcoming Sessions</span>
            <Button className="bg-primary hover:bg-primary/90">Schedule New Session</Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {upcomingSessions.length > 0 ? (
            <div className="space-y-4">
              {upcomingSessions.map(session => (
                <div key={session.id} className="bg-card/10 p-4 rounded-lg border border-white/5 hover:bg-card/20 transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-lg">{session.therapist}</h3>
                      <div className="flex items-center gap-2 text-muted-foreground mt-1">
                        <Calendar className="h-4 w-4" />
                        <span>{session.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground mt-1">
                        <Clock className="h-4 w-4" />
                        <span>{session.time}</span>
                      </div>
                      <div className="mt-2 text-sm">{session.type}</div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">Reschedule</Button>
                      <Button size="sm" variant="default">Join</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No upcoming sessions. Schedule your first session now.
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="bg-black-gradient border border-white/5 shadow-dark-glow">
        <CardHeader>
          <CardTitle>Past Sessions</CardTitle>
        </CardHeader>
        <CardContent>
          {pastSessions.length > 0 ? (
            <div className="space-y-4">
              {pastSessions.map(session => (
                <div key={session.id} className="bg-card/10 p-4 rounded-lg border border-white/5">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-lg">{session.therapist}</h3>
                      <div className="flex items-center gap-2 text-muted-foreground mt-1">
                        <Calendar className="h-4 w-4" />
                        <span>{session.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground mt-1">
                        <Clock className="h-4 w-4" />
                        <span>{session.time}</span>
                      </div>
                      {session.notes && (
                        <div className="mt-2 text-sm bg-card/5 p-2 rounded-md border border-white/5">
                          <span className="font-medium">Notes:</span> {session.notes}
                        </div>
                      )}
                    </div>
                    <Button size="sm" variant="outline">View Details</Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No past sessions found.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SessionsTab;
