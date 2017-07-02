# PROC-006 - Issue Tracking
--------------------------------------

## General

While test execution, QA may face some unexpected behavior or product malfunction. 
In this situations it is a direct QA responsibility to inform and escalate found issues to the team. 

Below are the steps of how to open, track and escalate defects.


## How to Open a Defect?

1) Click [New Issue] button - On [Issues] tab in GitHub Repository
2) Add a *Issue Title* - short summary describing the defect
3) Add *Issue Description*, detailed steps to reproduce with as much details as possible, including a screenshot or video.
4) Define the *Importance* of the issue by setting the corresponding label:
- Blocking 
- Critical 
- Major
- Minor
5) Define issue *type* by setting the corresponding label:
- Bug
- Enchancment
- Epic
6) Assign the issue to the corresponding *Project* if applicable
7) *Assign* the issue to a corresponding Team Member
8) Link issue to a *Milestone*
9) Move the issue to *Backlog* Pipeline
10) Click [Submit new issue] button 



## What happens with the defect after it was opened?
1) Development Team tracks the issues on the GitHub Board/Projects, as the work on the issue has start the issue is moved by Dev Team to *In Progress* state.
2) As the work is completed, a code change is pushed to Dev Environment for QA Validation. The issue is moved by Dev Team to *In Test* state
3) QA tracks all the issues in *In Test* state and validates them within 2 business days.
4) If defect checking is completed the issue is moved to either *Done* state or *In Progress* state.
- issues which passed the validation are moved into *Done* state
- issues which failed the validation are moved back to *In Progress* state for further adjustments
5) Product Owner / Project Managers reviews all the issues in *Done* state and takes a decision based on QA Test results whenever to close the issues or to perform additional improvements. At this point the issues is moved to *Closed* state.

## Who tracks and validates the defects?
## Issue types 
## Closing the defect process

