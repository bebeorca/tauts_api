const userservice = require("../services/user.service");

exports.getUserProfile = async (req, res) => {
  const id = req.user.id;
  const user = await userservice.getUser(id);
  if (!user) return res.status(404).json({ error: "User not found" });
  res.status(200).json({ status: 200, user });
};

exports.getAllUser = async (req, res) => {
  try {
    const users = await userservice.getAllUser();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Gagal mengambil data user" });
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  try {
    const updatedUser = await userservice.updateUser(id, data);

    if (!updatedUser) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    return res.json({ message: "User berhasil diupdate", user: updatedUser });
  } catch (error) {
    console.error("Error update user:", error);
    return res
      .status(500)
      .json({ message: "Gagal update user", error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await userservice.deletUser(id);
    if (deleted === 0) {
      return res.status(404).json({ message: 'User tidak ditemukan' });
    }
    return res.json({ message: 'User berhasil dihapus' });
  } catch (error) {
    console.error('Error hapus user:', error);
    return res.status(500).json({ message: 'Gagal hapus user', error: error.message });
  }
};
