const linkservice = require("../services/link.service");
const userservice = require("../services/user.service");

exports.getLinks = async (req, res) => {
  const { user_id } = req.params;
  const user = await userservice.getUser(user_id);
  if (!user) return res.status(404).json({ error: "User not found" });

  const { id, name, profile_image } = user;
  const links = await linkservice.getLinks(user_id);
  if (!links || links.length === 0) {
    return res.status(200).json({
      message: "no_links",
      user: { id, name, profile_image },
      data: [],
    });
  }

  res
    .status(200)
    .json({ status: 200, user: { id, name, profile_image }, data: links });
};

exports.createLink = async (req, res) => {
  try {
    const user_id = req.user.id;
    const data = { ...req.body, user_id };

    const nlink = await linkservice.createLink(data);
    res.status(200).json(nlink);
  } catch (error) {
    res.status(400).json({ error: "Failed to create link." });
  }
};

exports.updateLink = async (req, res) => {
  const { id } = req.params;
  const link = await linkservice.getLink(id);
  if (!link) return res.status(404).json({ message: "Link not found" });

  const { user_id } = link;
  if (user_id !== req.user.id) {
    return res.status(403).json({ message: "Forbidden: Access denied" });
  }
  
  const data = req.body;

  try {
    const updatedLink = await linkservice.updateLink(id, data);

    res.status(200).json(updatedLink);
  } catch (error) {
    console.error('Error updating link:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.deleteLink = async (req, res) => {
  const { id } = req.params;
  const link = await linkservice.getLink(id);
  if (!link) return res.status(404).json({ message: "Link not found" });

  const { user_id } = link;
  if (user_id !== req.user.id) {
    return res.status(403).json({ message: "Forbidden: Access denied" });
  }

  const deleted = await linkservice.deleteLink(id);

  res.status(200).json({ message: 'Link deleted successfully' });
}

exports.getLink = async (req, res) => {
  const { id } = req.params
  const link = await linkservice.getLink(id);
  if (!link) return res.status(404).json({ message: "Link not found" });

  const { user_id } = link;
  if (user_id !== req.user.id) {
    return res.status(403).json({ message: "Forbidden: Access denied" });
  }
  res.status(200).json(link)
}