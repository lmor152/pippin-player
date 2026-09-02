# Disabled

These four workflows never ran. They sit at `mpvkit/.github/workflows/`, and
GitHub only reads `<repository-root>/.github/workflows` — so every release this
directory claims to produce was in fact built by hand and uploaded manually.

They are renamed to `*.yml.disabled` rather than deleted, so that the record of
how the mpv-era builds were *meant* to run survives, but moving this directory to
the repository root can no longer start any of them. Three would have failed
immediately if it had:

- **`ci.yml`** builds `Demo/Demo-macOS` and `Demo/Demo-iOS`, neither of which
  exists in this repository — upstream MPVKit cruft. It triggers on `tags: '*'`,
  so activating it would fire a guaranteed-failing job on every tag push.
- **`check_version.yml`** runs a weekly cron that bumps the mpv and FFmpeg
  version pins and opens a PR. The patch series here is pinned to mpv `v0.41.0`
  and FFmpeg `n8.0.1` and does not apply to newer upstreams, so that cron could
  only ever produce broken pull requests.
- **`build.yml`** includes `maccatalyst` in its platform matrix, directly below
  a comment explaining that Catalyst is excluded because FFmpeg's SecureTransport
  TLS does not compile for it. The matrix wins; that job fails; `publish` needs
  `build`, so the release fails with it.

The **current** FFmpeg + libass build has working CI in the right place:
<https://github.com/lmor152/pippin-ffmpeg/blob/main/.github/workflows/build.yml>.
