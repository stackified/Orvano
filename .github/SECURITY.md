# Security Policy

## Supported versions

This is a portfolio/brand-website project. Only the latest version on the `main` branch is maintained.

| Version | Supported |
|---------|:---------:|
| Latest (`main`) | Yes |
| Older commits | No |

## Reporting a vulnerability

Please **do not open a public issue** for security problems.

Instead, use GitHub's private reporting:

1. Go to the [Security tab](https://github.com/stackified/Orvano/security).
2. Click **Report a vulnerability**.
3. Describe the issue, steps to reproduce, and potential impact.

You can expect an acknowledgement within a few days. Thank you for helping keep the project safe.

## Notes on this project

Orvano is a fully static front-end site (HTML, CSS, and vanilla JavaScript) with no backend,
no authentication, and no user data, so its security surface is small. There is no build step
and no third-party runtime dependencies. The JavaScript is scanned by CodeQL on every push.
