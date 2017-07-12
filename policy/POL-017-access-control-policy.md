# POL-017 - Access Control Policy


Revision | Revision Date | Author | Description of changes
-------- | ------------- | ------ | ----------------------
v0.0.1 | 2017-07-12 | Vladimir Ursu | Initial Document
v0.0.2 | 2017-07-13 | Eugene Istrati | Approved


# 1. OVERVIEW

See Purpose.

# 2. PURPOSE

Access control is designed to provide adequate permissions to information and services. This functionality is ensured through a formal authorization process, although the mechanisms may take many forms, it is typically role-based access control (RBAC) method used per user or per group.
This policy presents the security objectives that must be met through the different access control mechanisms. Also, it includes goals intended to all users that are given permissions to informational resources.

# 3. SCOPE

This policy applies to all critical information systems as well as their components. Keep in mind that when an information system does not perform critical operations it is not formally obliged to comply with all security objectives of this policy. In all cases, it is still recommended to follow and implement the control objectives from this policy.

# 4. POLICY

Information Security Team: group accountable for management of access rights to a resource: an information system, a technological component, a physical perimeter. In replacement of a designated security administrator, the person responsible for operating the technological component assumes this role/responsibility.

Owner of an information system: the information system group or its delegated operator. The owner authorizes access to its system by approving and reviewing an access policy submitted by the security administrator. The designated owner of the technological components is answerable for the operation of the information system component.

## 4.1 Policy distribution

Security policies and procedures must be distributed to new hires relevant to their newly appointed position.

*	Every relevant policy must be read, understood and signed before any access to production systems is granted.

*	Specific roles, such as the key custodians, require additional signed documents to fulfill their role.

*	Distribution of documents is done through Mitoc Group Inc's (the "Company") Google Drive, where all the documents are stored and accessible by parties after they've been granted access to the appropriate files & folders.

## 4.2 Access policy

Information Security Team, must maintain an access policy that meets and the following objectives:

*	Access right and privileges documentation of users for a set of computerized services and/or information which is managed by the administrator;

*	In order to ensure proper assignment of access rights at any time, the policy must be reviewed and reapproved annually by its owner(s).

*	A single access policy per information system must be maintained and approved by its owner;

*	Access policies pertaining to the underlying technological components of an information system needed for support and operational purposes are under the property and responsibility of its administrator (not the owner).

*	Whenever possible, the access rights and privileges assigned are based on the function of the users and limited to their required needs;

*	To ensure the accountability of all critical access, assigned user names/codes must be identifiable per individual. Any exception must be documented and justified.

## 4.3 User access management

Access management must be lead by the Information Security Team according to the access policy and meet the following objectives:

*	A formal process must be in place and support the access request, the request authorization and the permission attribution.

*	The hierarchical manager of the user requesting an access must justify the demand.

*	Any request must be either: pre defined and authorized by the access policy or authorized individually by the owner of the information system.

*	Access rights and privileges must be reviewed regularly, among others when terminating an employment or for a new user responsibility assignment.

*	The password allocation process must be formalized, ensure privacy at all times and respect the rules of its composition in force.

*	The separation of duties concept should be applied to ensure that a single person does not have complete access rights to a critical process or informational resource. This task separation should be understood and enforced by the owner of the information system, therefore allowing him a precise understanding of the operational safety protecting its business.

*	In exceptional situations when its required to provide access rights or privileges that exceed those required by the user to perform his regular duties (including masters privileges giving entitlement to a large part or all of the services or data of an information system) there must an administrative process (such as a form authorization) to control the access and privileges.

*	Remote-access technologies used by vendors and business partners must be activated only when needed by vendors and business partners, with immediate deactivation after use.

## 4.4 Controlling operating systems access and their operational tools

Access to operational tools, including database or Web administration must be managed according to the formal access policies, however, with the following discrepancies:

●	All user accounts must be personally identifiable to the Information Security Team unless there is a documented technical or operational constraint; all access and activity must be accountable to a person in all cases. When an exceptional situation occurs, compensate the control with administrative or manual/documented authorizations.

●	Master accounts or privileges that must be occasionally used should not be assigned to a regular (daily use) personal codes; master accounts are permitted on authorized request or constitute a second user account identifiable to the end user;

●	Accounts used in administration tools or in services whose passwords must be predefined in configuration files must be ‘protection reinforced’ for access control and/or cryptographic ways to ensure password confidentiality.

## 4.5 Information systems access control

Access right allocation to information systems required for an operation team (generic code for several individuals) must be authorized beforehand. Activities may include maintenance, correction, or diagnosis and should always leave a trace/justification of the account usage.

Production information systems data sets shall always be isolated from test and development environments. Test data sets (anonymous and without sensitive information) should be used for these environments.

## 4.6 Mobile computing and teleworking

To ensure protection of Company's confidential information, all mobile devices that store such information must be equipped with data encryption mechanisms and meet all the criteria mentioned in the POL 011 Mobile Device Security Policy.

## 4.7 Formal exchange of information with third parties

To ensure information protection all third party procedures for accessing the network or the Company’s information must meet POL 012 Third Party Access Policy.


# 5. POLICY COMPLIANCE 

## 5.1	Compliance Measurement

The Information Security Team will verify compliance to this policy through various methods, including but not limited to, periodic walk-thrus, video monitoring, business tool reports, internal and external audits, and feedback to the policy owner. 

##  5.2	Exceptions

Any exception to the policy must be approved by the Information Security Team
(security@mitocgroup.com) in advance.

##  5.3	Non-Compliance

An employee found to have violated this policy may be subject to disciplinary
action, up to and including termination of employment. 
