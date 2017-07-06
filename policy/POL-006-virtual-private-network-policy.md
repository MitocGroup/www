# POL-006 - Virtual Private Network (VPN) Policy


Revision | Revision Date | Author | Description of changes
-------- | ------------- | ------ | ----------------------
v0.0.1 | 2017-06-27 | Vladimir Ursu | Initial Document
v0.0.2 | 2017-06-28 | Eugene Istrati | Approved


# 1. OVERVIEW

See Purpose.


# 2. PURPOSE

The purpose of this policy is to provide guidelines for Remote Access IPSec or
L2TP Virtual Private Network (VPN) connections to the corporate network of
Mitoc Group (the "Company").


# 3. SCOPE

This policy applies to all Company's employees, contractors, consultants,
temporaries, and other workers including all personnel affiliated with third
parties utilizing VPNs to access Company's network. This policy applies to
implementations of VPN that are directed through an IPSec Concentrator.


# 4. POLICY 

Approved Company's employees and authorized third parties (customers, vendors,
etc.) may utilize the benefits of VPNs, which are a "user managed" service.
This means that the user is responsible for selecting an Internet Service
Provider (ISP), coordinating installation, installing any required software,
and paying associated fees. Further details may be found in the Remote Access
Policy.

Additionally,

1.	It is the responsibility of employees with VPN privileges to ensure that
unauthorized users are not allowed access to Company's internal networks.

2.	VPN use is to be controlled using either a one-time password authentication
such as a token device or a public/private key system with a strong passphrase.

3.	When actively connected to the corporate network, VPNs will force all
traffic to and from the PC over the VPN tunnel: all other traffic will be
dropped.

4.	Dual (split) tunneling is NOT permitted; only one network connection is
allowed.

5.	VPN gateways will be set up and managed by Company's network operational
groups.

6.	All computers connected to Company's internal networks via VPN or any
other technology must use the most up-to-date anti-virus software that is the
corporate standard as mentioned in Anti-virus Policy; this includes personal
computers.

7.	VPN users will be automatically disconnected from Company's network after
thirty minutes of inactivity. The user must then logon again to reconnect to
the network. Pings or other artificial network processes are not to be used
to keep the connection open.

8.	The VPN concentrator is limited to an absolute connection time of 24 hours.

9.	Users of computers that are not Company-owned equipment must configure the
equipment to comply with Company's VPN and Network policies.

10.	Only Information Security Team-approved VPN clients may be used.

11.	By using VPN technology with personal equipment, users must understand that
their machines are a de facto extension of Company's network, and as such are
subject to the same rules and regulations that apply to Company-owned equipment,
i.e., their machines must be configured to comply with Information Security
Team's Security Policies.


# 5. POLICY COMPLIANCE 

## 5.1	Compliance Measurement

The Information Security Team will verify compliance to this policy through
various methods, including but not limited to, periodic walk-thrus, video
monitoring, business tool reports, internal and external audits, and feedback
to the policy owner.

##  5.2	Exceptions

Any exception to the policy must be approved by the Information Security Team
(security@mitocgroup.com) in advance.

##  5.3	Non-Compliance

An employee found to have violated this policy may be subject to disciplinary
action, up to and including termination of employment.


# 6. RELATED, STANDARDS, POLICIES and PROCESSES 

* Remote Access Policy
* Anti-Virus Policy
