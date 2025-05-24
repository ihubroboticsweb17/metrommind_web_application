
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Calendar, BarChart, TrendingUp, CheckCircle, Clock } from "lucide-react";

const AssessmentsTab = () => {
  const pendingAssessments = [
    {
      id: 1,
      name: "Depression Screening (PHQ-9)",
      description: "Evaluate symptoms of depression",
      estimatedTime: "5 min",
      dueDate: "May 18, 2023"
    },
    {
      id: 2,
      name: "Anxiety Assessment (GAD-7)",
      description: "Measure anxiety severity",
      estimatedTime: "4 min",
      dueDate: "May 20, 2023"
    }
  ];
  
  const completedAssessments = [
    {
      id: 3,
      name: "Initial Mental Health Screening",
      description: "Comprehensive mental health evaluation",
      completedDate: "April 30, 2023",
      score: 72,
      interpretation: "Mild symptoms detected"
    },
    {
      id: 4,
      name: "Weekly Mood Tracker",
      description: "Track mood fluctuations",
      completedDate: "May 7, 2023",
      score: 65,
      interpretation: "Improving trend detected"
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-black-gradient border border-white/5 shadow-dark-glow">
        <CardHeader>
          <CardTitle>Pending Assessments</CardTitle>
          <CardDescription>Complete these assessments to help your therapist track your progress</CardDescription>
        </CardHeader>
        <CardContent>
          {pendingAssessments.length > 0 ? (
            <div className="space-y-4">
              {pendingAssessments.map(assessment => (
                <div key={assessment.id} className="bg-card/10 p-4 rounded-lg border border-white/5">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-lg">{assessment.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{assessment.description}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-1 text-sm">
                          <Clock className="h-3 w-3" />
                          <span>{assessment.estimatedTime}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <Calendar className="h-3 w-3" />
                          <span>Due: {assessment.dueDate}</span>
                        </div>
                      </div>
                    </div>
                    <Button size="sm">Take Assessment</Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No pending assessments. Check back later.
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="bg-black-gradient border border-white/5 shadow-dark-glow">
        <CardHeader>
          <CardTitle>Completed Assessments</CardTitle>
          <CardDescription>Review your past assessment results and progress</CardDescription>
        </CardHeader>
        <CardContent>
          {completedAssessments.length > 0 ? (
            <div className="space-y-6">
              {completedAssessments.map(assessment => (
                <div key={assessment.id} className="bg-card/10 p-4 rounded-lg border border-white/5">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2 w-full">
                      <div className="flex justify-between">
                        <h3 className="font-medium text-lg">{assessment.name}</h3>
                        <div className="flex items-center gap-1 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>Completed: {assessment.completedDate}</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{assessment.description}</p>
                      
                      <div className="mt-2">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Score: {assessment.score}/100</span>
                          <span className="text-primary">{assessment.interpretation}</span>
                        </div>
                        <Progress value={assessment.score} className="h-2" />
                      </div>
                      
                      <div className="flex justify-end mt-3">
                        <Button size="sm" variant="outline" className="flex items-center gap-1">
                          <BarChart className="h-4 w-4" />
                          <span>View Details</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No completed assessments yet.
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="bg-black-gradient border border-white/5 shadow-dark-glow">
        <CardHeader>
          <CardTitle>Progress Tracking</CardTitle>
          <CardDescription>View your mental health journey over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center p-4 h-48 border border-dashed border-white/10 rounded-lg">
            <div className="flex flex-col items-center text-center gap-2">
              <TrendingUp className="h-8 w-8 text-muted-foreground" />
              <p className="text-muted-foreground">Your progress charts will appear here as you complete more assessments</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AssessmentsTab;
