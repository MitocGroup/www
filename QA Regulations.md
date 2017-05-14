**QA Regulations Ver.1.0** 
------------------

Initially, QA helps design and control the development process in a way
that prevents serious issues during the project. To make this happen, QA
engineers work on the project together with other team members (product
owner, project manager, business analyst, and dev lead) throughout the
complete software development cycle. The number and the order of QA
activities may vary from project to project, depending heavily on the
scope of the work and the project aims.

**Development process**

1)  Analysis of requirements

2)  Design

3)  Implementation

4)  Verification or testing

5)  Maintenance

**QA process**

1)  Review of requirements

2)  Test planning / writing test cases

3)  Integration testing

4)  System testing

5)  Security testing

6)  Cross-browser testing / cross-platform testing

7)  Updating test cases

8)  Regression testing

![DEV-QA Process](https://github.com/MitocGroup/SDLC/blob/master/images/dev-qa%20process.png)

Let’s have a deeper look at QA processes and how they are connected with
the development steps.

----------------------------------------------------------------------------------------------------------------

### **STEP ONE: REVIEW REQUIREMENTS AND DOCUMENTATION.**

QA engineers start their work on the project in parallel with
documentation generation. They review the requirements and documentation
for:

- completeness

- redundancies

- clarity

- consistency

- executability

The aim is to analyze system architecture and technologies for
discrepancies.

**Key benefits for the development process:**

- Errors cost less when detected at an early stage

- Improved documentation means a higher quality project for lower labor
input and more accurate estimates.

----------------------------------------------------------------------------------------------------------------

### **STEP TWO: PLAN AND PREPARE TEST CASES**

When the requirements have been established, it is time to start
planning test cases, i.e. - describe the actions QA engineers perform to
make sure the piece of software functions as planned. Test cases can be
written in simple Excel file. Here is an example of test cases:

![Test Case Sample](https://github.com/MitocGroup/SDLC/blob/master/images/test%20case%20template.png)

----------------------------------------------------------------------------------------------------------------

### **STEP THREE: DESIGN TEST CASES**

When the development stage is finished, the QA team starts running the
test cases. The main goal of this stage is to check whether the solution
is developed properly from the technical perspective and meets the
initial product owner’s requirements.

Below are the main QA activities and their aims:

- **Smoke testing** comes first. QA engineers lightly check that the
software, or its module, functions as planned. When passed, further
investigation begins.

- **Integration testing** – verify that different components work as a
single system.

- **Performance testing** that includes:

*Load testing* – check system behavior for normal and expected peak load

*Stress testing* – determine critical load after which the system breaks
down

- **Security testing** – ensure the solution has a sufficient protection
level.

- **Cross-browser testing**/cross-platform testing – check that the
software works smoothly on different browsers (Chrome, Mozilla, Safari)
or platforms (Android, iOS, Windows Phone). This is especially important
for web and hybrid apps.

- **Regression testing** – detect bugs in the code that was tested
previously. Usually needed when adding new features or making any
updates to an existing system.

Again, you can choose to automate the testing (e.g., unit testing,
regression testing). The general rule: the longer a project lasts, the
more it needs automated tests.

----------------------------------------------------------------------------------------------------------------
### **STEP FOUR: REPORT AND MEASURE**

When a QA engineer discovers a bug, he/she records it in a bug tracking
system which is also a project management system. For this we can use
one public excel sheet. Here is an example:

![Report Sample](https://github.com/MitocGroup/SDLC/blob/master/images/report%20template.png)

For more information please see *Issue Tracking process* document

Each issue gets a priority level from urgent to low, which the
development team then resolves based on time and people available.

----------------------------------------------------------------------------------------------------------------

### **STEP FIVE: VERIFYING FIXES**

When a developer fixes an issue he/she informs the responsible QA
engineers, who verifies it. The ticket in the bug tracking system is
closed when no issues are detected. This rule applies: no bug can be
marked as fixed until it is verified.

Some stages of the Development and QA processes can be performed
simultaneously to save time, for example: Analysis and Review of
requirements, Implementation & Test planning, or even Running different
types of tests during development. In these parallel stages the testing
activities help measure the success of the corresponding development
tasks.

**Step by Step testing**

Time frames between start development and start testing

![Process](https://github.com/MitocGroup/SDLC/blob/master/images/step%20by%20step.png)

A closed look on each time sequence:

1)  New functionality -&gt; developers start their work (From A -&gt; C)

2)  QA start writing test cases. Analysing scope of future changes,
    > providing estimates (From B -&gt;)

3)  Kick off code for testing (final version of code is pushed to dev
    > environments, could be download on local machine, etc…) (From
    > C-&gt;)

4)  Cycle for C-&gt;D:

**First iteration:**

4.1) QA starts testing.

4.2) First look on functionality - exploratory testing. No blockers,
critical should be present in the code.

4.2.1) If blockers present QA should log an issue on GitHub and assign
to responsible Developer. **Issue Opened**

4.2.2) Developers fix issues

4.3) QA receive the code - repeat step 4.2

4.4) QA starts testing using Regression library. Depends of the scope
and time following testing should be performed:

-   **Integration testing**

-   **Security testing**

-   **Cross-browser testing**/cross-platform testing

-   **Regression testing** (Tier based)

-   **Performance testing**

4.5) Issues found during testing should be opened and escalated to
developers (for more details please refer to a *Issue Tracking process*
document)

4.6) Fixed issues should be re-tested and statuses should be updated

4.7) Sign off. Can be provided with following conditions:

-   Not all defects are fixed, should be ok for businesses (conditional sing off, template to provide)

-   QA Findings - providing when not full cycle was performed

-   Sign off (template to provide)

4.8) After code was pushed to PROD - smoke test on PROD environment
should be performed

4.9) Updating existing test cases. Supporting of regression library.

5.0) Repeat cycle
