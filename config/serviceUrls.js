

// Estas são URLs de exemplo. Substitua pelas URLs reais onde seus microserviços estão hospedados.

const SERVICE_URLS = {
  add: process.env.ADD_SERVICE_URL || 'https://soma-psi.vercel.app/api',
  subtract: process.env.SUBTRACT_SERVICE_URL || 'http://localhost:3002/subtract',
  multiply: process.env.MULTIPLY_SERVICE_URL || 'http://localhost:3003/multiply',
  divide: process.env.DIVIDE_SERVICE_URL || 'http://localhost:3004/divide'
};

export default SERVICE_URLS;
