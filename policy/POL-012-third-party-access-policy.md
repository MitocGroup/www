# POL-012 - Third-Party Access Policy


Revision | Revision Date | Author | Description of changes
-------- | ------------- | ------ | ----------------------
v0.0.1 | 2017-06-28 | Vladimir Ursu | Initial Document
v0.0.2 | 2017-06-29 | Eugene Istrati | Approved


# 1. OVERVIEW

See Purpose.

# 2. PURPOSE

The purpose of this policy is to ensure that a secure method of network connectivity between Mitoc Group (the "Company") and all third parties exists, and to provide a formalized method for the request, approval and tracking of such connections.


# 3. SCOPE

External company data network connections to Company can create potential security exposures if not administered and managed correctly and consistently. These exposures may include non-approved methods of connection to the Company network, the inability to shut down access in the event of a security breach, and exposure to hacking attempts. This policy applies to all new Third Party Network Connection requests and any existing Third Party Network Connections. When existing Third Party Network Connections do not meet all of the guidelines and requirements outlined in this document, they will be reengineered as needed. 

# 4. POLICY 

## 4.1 Approval

4.1 All third party access must be approved, recorded and reviewed by Information Security Team (security@mitocgroup.com)

4.2 All Third Party connection requests must have the Information Security Manager signature for approval. Also,
all Third Parties requesting a Network Connection must complete and sign the Third Party Contractor Access – Non-disclosure and Access Agreement Form. 

## 4.2 Procedure

4.2.1 In general, services provided over Third Party Network Connections will be limited only to those services needed, and only to those devices (hosts, routers, etc.) needed. Blanket access will not be provided for anyone. The default policy position is to deny all access and then only allow those specific services that are needed and approved by Company pursuant to the established procedure. 

4.2.2 The standard allowable services are listed below:

* File Exchange via sftp - Where possible, file exchange via sftp should take place on the existing Company ftp servers.

* SSH access will be provided to specific Company hosts, as needed. Employees from Third Parties will only be given accounts on the specific Comapny hosts that are needed.

* Access to Source Code Repositories - this access will be decided on case by case basis.

* File Exchange - File exchange will be provided by AWS servers located on the Company accounts. Each Third Party needing File exchange will be provided with a separate folder that is only accessible to that Party and the necessary people at Company.

* Access to ICA and RDP sessions as required.

4.2.3 Audit and review of Third Party Network and Connections

4.2.4 All aspects of Third Party Network Connections - up to, but not including the third party's firewall, will be monitored by the Information Security Team. Where possible , automated tools will be used to accomplish the auditing tasks. Monthly reports will be generated on the access made showing the specific login entries and the appropriate Company access.

4.2.5 All Third Party Network Connections will be reviewed on a yearly basis and information regarding specific Third Party Network Connection will be updated as necessary. Obsolete Third Party Network Connections will be terminated as and when software contracts are terminated/expired.


# 5. POLICY COMPLIANCE 

## 5.1	Compliance Measurement

The Information Security Team will verify compliance to this policy through various methods, including but not limited to, periodic walk-thrus, video monitoring, business tool reports, internal and external audits, and feedback to the policy owner. 

##  5.2	Exceptions

Any exception to the policy must be approved by the Information Security Team (security@mitocgroup.com) in advance.

##  5.3	Non-Compliance

An employee found to have violated this policy may be subject to disciplinary action, up to and including termination of employment. 
