// const fs = require('fs');
// const path = require('path');

// const folders = [
//   'config',
//   'controllers',
//   'middlewares',
//   'models',
//   'routes',
//   'services',
//   'utils',
//   'tests',
//   'public'
// ];

// const files = {
//   'config/db.js': '',
//   'controllers/userController.js': '',
//   'middlewares/authMiddleware.js': '',
//   'models/userModel.js': '',
//   'routes/userRoutes.js': '',
//   'services/userService.js': '',
//   'utils/logger.js': '',
//   'tests/user.test.js': '',
//   'public/index.html': '',
//   '.env': '',
//   'README.md': '',
//   'app.js': `const express = require('express');\nconst app = express();\nconst PORT = process.env.PORT || 3000;\napp.use(express.json());\napp.listen(PORT, () => {\n    console.log(\`Server running on port \${PORT}\`);\n});\n`
// };

// // Create folders
// folders.forEach(dir => {
//   fs.mkdirSync(path.join(__dirname, dir), { recursive: true });
// });

// // Create files
// Object.keys(files).forEach(file => {
//   fs.writeFileSync(path.join(__dirname, file), files[file], 'utf8');
// });

// console.log('Project structure created successfully!');
