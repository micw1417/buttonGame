@echo off

echo Building frontend...
pushd frontend
call npm run build
popd

echo Starting backend...
python app.py