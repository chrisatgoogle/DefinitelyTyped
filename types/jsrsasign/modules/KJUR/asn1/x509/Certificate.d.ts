declare namespace jsrsasign.KJUR.asn1.x509 {
    /**
     * X.509 Certificate class to sign and generate hex encoded certificate
     * @param params associative array of parameters (ex. {'tbscertobj': obj, 'prvkeyobj': key})
     * @description
     * As for argument 'params' for constructor, you can specify one of
     * following properties:
     *
     * - tbscertobj - specify `KJUR.asn1.x509.TBSCertificate` object
     * - prvkeyobj - specify `RSAKey`, `KJUR.crypto.ECDSA` or `KJUR.crypto.DSA` object for CA private key to sign the certificate
     *
     * NOTE1: 'params' can be omitted.
     * NOTE2: DSA/ECDSA is also supported for CA signging key from asn1x509 1.0.6.
     * @example
     * var caKey = KEYUTIL.getKey(caKeyPEM); // CA's private key
     * var cert = new KJUR.asn1x509.Certificate({'tbscertobj': tbs, 'prvkeyobj': caKey});
     * cert.sign(); // issue certificate by CA's private key
     * var certPEM = cert.getPEMString();
     *
     * // Certificate  ::=  SEQUENCE  {
     * //     tbsCertificate       TBSCertificate,
     * //     signatureAlgorithm   AlgorithmIdentifier,
     * //     signature            BIT STRING  }
     */
    class Certificate extends ASN1Object {
        constructor(params?: { prvkeyobj?: RSAKey | crypto.ECDSA | crypto.DSA | undefined; tbscertobj?: TBSCertificate | undefined });

        /**
         * sign TBSCertificate and set signature value internally
         * @example
         * var cert = new KJUR.asn1.x509.Certificate({tbscertobj: tbs, prvkeyobj: prvKey});
         * cert.sign();
         */
        sign(): void;

        /**
         * set signature value internally by hex string
         * @example
         * var cert = new KJUR.asn1.x509.Certificate({'tbscertobj': tbs});
         * cert.setSignatureHex('01020304');
         */
        setSignatureHex(sigHex: string): void;

        getEncodedHex(): string;

        /**
         * get PEM formatted certificate string after signed
         * @return PEM formatted string of certificate
         * @since jsrsasign 9.0.0 asn1hex 2.0.0
         * @description
         * This method returns a string of PEM formatted
         * certificate.
         * @example
         * cert = new KJUR.asn1.x509.Certificate({...});
         * cert.getPEM() &rarr;
         * "-----BEGIN CERTIFICATE-----\r\n..."
         */
        getPEM(): string;
    }
}
