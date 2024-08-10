import apps from '../../config/app';

export default function handler(req, res) {
  res.status(200).json(apps);
}