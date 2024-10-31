### Generate KEY JWT
```
openssl genpkey -algorithm RSA -out private_key.pem -pkeyopt rsa_keygen_bits:2048
openssl rsa -pubout -in private_key.pem -out public_key.pem

```
```
base64 private_key.pem > private_key-base64.txt
base64 public_key.pem > public_key-base64.txt
```
