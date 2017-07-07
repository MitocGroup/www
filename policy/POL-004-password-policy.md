# POL-004 - Password Policy


Revision | Revision Date | Author | Description of changes
-------- | ------------- | ------ | ----------------------
v0.0.1 | 2017-06-27 | Vladimir Ursu | Initial Document
v0.0.2 | 2017-06-28 | Eugene Istrati | Approved


# 1. OVERVIEW

Passwords are an important aspect of computer security. A poorly chosen
password may result in unauthorized access and/or exploitation of resources of
Mitoc Group (the "Company"). All users, including contractors and vendors with
access to Company's systems, are responsible for taking the appropriate steps,
as outlined below, to select and secure their passwords.


# 2. PURPOSE

The purpose of this policy is to establish a standard for creation of strong
passwords, the protection of those passwords, and the frequency of change.


# 3. SCOPE

The scope of this policy includes all personnel who have or are responsible
for an account (or any form of access that supports or requires a password) on
any system that resides at any Company's facility, has access to Company's
network, or stores any non-public Company's information.

This policy applies to employees, contractors, consultants, temporary and other
workers at the Company, including all personnel affiliated with third parties.
This guideline applies to all passwords including but not limited to user-level
accounts, system-level accounts, web accounts, e-mail accounts, screen saver
protection, voicemail, and local router logins.


# 4. POLICY 

##    4.1 Guidelines

All passwords should meet or exceed the following guidelines

Strong passwords have the following characteristics: 

*	Contain at least 12 alphanumeric characters.
*	Contain both upper and lower case letters.
*	Contain at least one number (for example, 0-9).
*	Contain at least one special character (for example,
!$%^&*()_+|~-=\{}[]:";'<>?,/).

Poor, or weak, passwords have the following characteristics: 
    
*	Contain less than eight characters.
*	Can be found in a dictionary, including foreign language, or exist in a
language slang, dialect, or jargon.
*	Contain personal information such as birthdates, addresses, phone numbers,
or names of family members, pets, friends, and fantasy characters.
*	Contain work-related information such as building names, system commands,
sites, companies, hardware, or software.
*	Contain number patterns such as aaabbb, qwerty, zyxwvuts, or 123321.
*	Contain common words spelled backward, or preceded or followed by a number
(for example, terces, secret1 or 1secret).
*	Are some version of "Welcome123" "Password123" "Changeme123"

You should never write down a password. Instead, try to create passwords that
you can remember easily. One way to do this is create a password based on a
song title, affirmation, or other phrase. For example, the phrase, "This May Be
One Way To Remember" could become the password TmB1w2R! or another variation.

(NOTE: Do not use either of these examples as passwords!)

##    4.2 Password Creation 

4.2.1	All user-level and system-level passwords must conform to the Password
Construction Guidelines.

4.2.2	Users must not use the same password for Company's accounts as for
other non-Company's access (for example, personal ISP account, option trading,
benefits, and so on).

4.2.3	Where possible, users must not use the same password for various
Company's access needs.

4.2.4	User accounts that have system-level privileges granted through group
memberships or programs such as sudo must have a unique password from all other
accounts held by that user to access system-level privileges.

4.2.5	Where Simple Network Management Protocol (SNMP) is used, the community
strings must be defined as something other than the standard defaults of
public, private, and system and must be different from the passwords used to
log in interactively. SNMP community strings must meet password construction
guidelines.

##    4.3 Password Change

4.3.1	All system-level passwords (for example, root, enable, NT admin,
application administration accounts, and so on) must be changed on at least a
quarterly basis.

4.3.2	All user-level passwords (for example, email, web, desktop computer,
and so on) must be changed at least every six months. The recommended change
interval is every four months.

4.3.3	Password cracking or guessing may be performed on a periodic or random
basis by the Information Security Team or its delegates. If a password is
guessed or cracked during one of these scans, the user will be required to
change it to be in compliance with the Password Construction Guidelines.

##    4.4 Password Protection 

4.1.1	Passwords must not be shared with anyone. All passwords are to be
treated as sensitive, Company's Confidential Information. Corporate Information
Security recognizes that legacy applications do not support proxy systems in
place. Please refer to the technical reference for additional details.

4.1.2	Passwords must not be inserted into email messages, Alliance cases or
other forms of electronic communication.

4.1.3	Passwords must not be revealed over the phone to anyone.

4.1.4	Do not reveal a password on questionnaires or security forms.

4.1.5	Do not hint at the format of a password (for example, "my family name").

4.1.6	Do not share Company's passwords with anyone, including administrative
assistants, secretaries, managers, co-workers while on vacation, and family
members.

4.1.7	Do not write passwords down and store them anywhere in your office. Do
not store passwords in a file on a computer system or mobile devices (phone,
tablet) without encryption.

4.1.8	Do not use the "Remember Password" feature of applications
(for example, web browsers).

4.1.9	Any user suspecting that his/her password may have been compromised
must report the incident and change all passwords.

##    4.5 Application Development

Application developers must ensure that their programs contain the following
security precautions:

4.5.1	Applications must support authentication of individual users,
not groups.

4.5.2	Applications must not store passwords in clear text or in any easily
reversible form.

4.5.3	Applications must not transmit passwords in clear text over the network.

4.5.4	Applications must provide for some sort of role management, such that
one user can take over the functions of another without having to know the
other's password.

##    4.6 Use of Passwords and Passphrases

Passphrases are generally used for public/private key authentication.
A public/private key system defines a mathematical relationship between the
public key that is known by all, and the private key, that is known only to
the user. Without the passphrase to "unlock" the private key, the user cannot
gain access.

Passphrases are not the same as passwords. A passphrase is a longer version
of a password and is, therefore, more secure. A passphrase is typically
composed of multiple words. Because of this, a passphrase is more secure
against "dictionary attacks."

A good passphrase is relatively long and contains a combination of upper and
lowercase letters and numeric and punctuation characters. An example of a
good passphrase:

	"The*?#>*@TrafficOnThe101Was*&#!#ThisMorning" 

All of the rules above that apply to passwords apply to passphrases.


# 5. POLICY COMPLIANCE 

## 5.1 Compliance Measurement

The Information Security team will verify compliance to this policy through
various methods, including but not limited to, periodic walk-thrus, video
monitoring, business tool reports, internal and external audits, and feedback
to the policy owner.

## 5.2 Exceptions

Any exception to the policy must be approved by the Information Security Team
(security@mitocgroup.com) in advance.

## 5.3 Non-Compliance

An employee found to have violated this policy may be subject to disciplinary
action, up to and including termination of employment.
