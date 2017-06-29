# POL-009 - Acceptable Encryption Policy
-----------------------------------------


Revision | Revision Date | Author | Description of changes
-------- | ------------- | ------ | ----------------------
v0.0.1 | 2017-06-28 | Vladimir Ursu | Initial Document
v0.0.2 | 2017-06-29 | Eugene Istrati | Approved


# 1. OVERVIEW

See Purpose.


# 2. PURPOSE

The purpose of this policy is to provide guidance that limits the use of encryption to those algorithms that have received substantial public review and have been proven to work effectively. Additionally, this policy provides direction to ensure that Federal regulations are followed, and legal authority is granted for the dissemination and use of encryption technologies outside of the United States.


# 3. SCOPE

This policy applies to all Mitoc Group (the "Company") employees and affiliates.


# 4. POLICY 

## 4.1 Algorithm Requirements

4.1.1 Ciphers in use must meet or exceed the set defined as "AES-compatible" or "partially AES-compatible" according to the [IETF/IRTF Cipher Catalog](https://tools.ietf.org/html/draft-irtf-cfrg-cipher-catalog-01#section-3.1 ), or the set defined for use in the United States [National Institute of Standards and Technology (NIST) publication FIPS 140-2](http://csrc.nist.gov/groups/STM/cmvp/documents/140-1/1401val2010.htm), or any superseding documents according to the date of implementation. The use of the Advanced Encryption Standard (AES) is strongly recommended for symmetric encryption.

4.1.2 Algorithms in use must meet the standards defined for use in NIST publication [FIPS 140-2](http://csrc.nist.gov/groups/STM/cmvp/documents/140-1/1401val2010.htm) or any superseding document, according to date of implementation. The use of the RSA and Elliptic Curve Cryptography (ECC) algorithms is strongly recommended for asymmetric encryption.

4.1.3 Signature Algorithms 

Algorithm  | Key Length (min) | Additional Comment
---------- | ---------------- | ----------------------
ECDSA  | 2P-256  | Cisco Legal recommends [RFC6090](https://tools.ietf.org/html/rfc6090) compliance to avoid patent infringement. 
RSA    | 2048    | Must use a secure padding scheme. [PKCS#7 padding scheme](http://tools.ietf.org/html/rfc3852#section-6.3) is recommended. Message hashing required.
LDWM   | SHA256  | Refer to [LDWM Hash-based Signatures Draft](http://tools.ietf.org/html/draft-mcgrew-hash-sigs-00)

## 4.2 Hash Function Requirements

In general, Company's adheres to the [NIST Policy on Hash Functions](http://csrc.nist.gov/groups/ST/hash/policy.html).

## 4.3 Key Agreement and Authentication

4.3.1 Key exchanges must use one of the following cryptographic protocols: DiffieHellman, IKE, or Elliptic curve Diffie-Hellman (ECDH).

4.3.2 End points must be authenticated prior to the exchange or derivation of session keys.

4.3.3 Public keys used to establish trust must be authenticated prior to use. Examples of authentication include transmission via cryptographically signed message or manual verification of the public key hash.

4.3.4 All servers used for authentication (for example, RADIUS or TACACS) must have installed a valid certificate signed by a known trusted provider.

4.3.5 All servers and applications using SSL or TLS must have the certificates signed by a known, trusted provider. 

## 4.4 Key Generation

4.4.1 Cryptographic keys must be generated and stored in a secure manner that prevents loss, theft, or compromise.

4.4.2 Key generation must be seeded from an industry standard random number generator (RNG). For examples, see [NIST Annex C: Approved Random Number Generators for FIPS PUB 140-2](http://csrc.nist.gov/publications/fips/fips140-2/fips1402annexc.pdf).


# 5. POLICY COMPLIANCE 

## 5.1	Compliance Measurement

The Information Security Team will verify compliance to this policy through various methods, including but not limited to, periodic walk-thrus, video monitoring, business tool reports, internal and external audits, and feedback to the policy owner. 

##  5.2	Exceptions

Any exception to the policy must be approved by the Information Security Team (security@mitocgroup.com) in advance.

##  5.3	Non-Compliance

An employee found to have violated this policy may be subject to disciplinary action, up to and including termination of employment. 
