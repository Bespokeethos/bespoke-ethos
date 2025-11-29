# Contributing to Brutus Intelligence Platform

Thank you for your interest in contributing! This document outlines the process and guidelines.

## Development Setup

1. **Fork and clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/brutus-intelligence.git
   cd brutus-intelligence
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your API keys
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

## Code Standards

- **TypeScript**: All new code must be TypeScript with strict typing
- **No `any` types**: Explicit types required (unless interfacing with untyped libraries)
- **ESLint**: Code must pass `npm run lint` with zero warnings
- **Error Handling**: All API endpoints must have graceful error handling
- **Tests**: Add tests for new API endpoints (`scripts/brutus-test-api.mjs` pattern)

## Pull Request Process

1. **Branch naming**: `feature/description` or `fix/description`
2. **Commit messages**: Clear, descriptive (e.g., "Add rate limiting to OpenAI endpoint")
3. **Testing**: Run `npm run typecheck` and `npm run lint` before submitting
4. **Documentation**: Update relevant docs (BRUTUS_API.md, README.md, etc.)

## What We're Looking For

### High Priority
- Additional model providers (Claude, Mistral, Cohere)
- Usage analytics dashboard
- Rate limiting per API key
- Webhook support for async tasks
- Fine-tuning pipeline

### Medium Priority
- GraphQL API alternative
- Multi-region deployment guides
- Performance benchmarks
- Additional language SDKs (Python, Go, etc.)

### Low Priority
- UI improvements
- Documentation translations
- Example applications

## Code Review

All contributions will be reviewed by maintainers. We typically respond within 48 hours.

**What we check:**
- Code quality and TypeScript standards
- Security (especially auth/API key handling)
- Performance impact
- Documentation completeness
- Test coverage

## Commercial Contributions

If you're contributing as part of paid work or on behalf of a commercial entity:
1. Ensure your employer has a commercial license
2. Add your company to CONTRIBUTORS.md
3. Note your affiliation in PR description

## Community Guidelines

- **Be respectful**: We're all here to build something useful
- **Be inclusive**: LGBTQ+ friendly, pro-business, community-first
- **Be constructive**: Critique code, not people
- **Be patient**: Maintainers are volunteers (unless you're an Enterprise customer!)

## License

By contributing, you agree that your contributions will be licensed under the same dual license as the project (MIT for non-commercial, Commercial for business use).

---

**Questions?** Open an issue or email dev@bespoke-ethos.com

**Security issues?** Email security@bespoke-ethos.com (do not open public issues)
