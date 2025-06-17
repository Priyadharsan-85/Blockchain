cargo build --release --target wasm32-unknown-unknown --package hackproj_backend

candid-extractor target/wasm32-unknown-unknown/release/hackproj_backend.wasm > src/hackproj_backend/hackproj_backend.did