import  bcrypt from 'bcrypt';
const jwt = require('jsonwebtoken');

export const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ error: 'Tous les champs sont requis.' });
    }

    if (!['formateur', 'etudiant'].includes(role)) {
      return res.status(400).json({ error: 'Le rôle doit être "formateur" ou "etudiant".' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    res.status(201).json({ message: 'Utilisateur créé avec succès.', user });
  } catch (error) {
    console.error('Erreur lors de la création de l\'utilisateur :', error);
    res.status(500).json({ error: 'Une erreur est survenue.' });
  }
};
