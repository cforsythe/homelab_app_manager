import haIcon from '../public/images/ha_icon.png';
import mealieIcon from '../public/images/mealie_icon.png';
import openmediavaultIcon from '../public/images/openmediavault_icon.png';
import overseerrIcon from '../public/images/overseerr_icon.png';
import plexIcon from '../public/images/plex_icon.png';
import prowlarrIcon from '../public/images/prowlarr_icon.png';
import proxmoxIcon from '../public/images/proxmox_icon.png';
import qbittorrentIcon from '../public/images/qbittorrent_icon.png';
import radarrIcon from '../public/images/radarr_icon.png';
import sonarrIcon from '../public/images/sonarr_icon.png';


module.exports = [
    // Internal Apps
    // Great for finding icons: https://iconduck.com/
    { name: 'Proxmox', url: 'https://192.168.1.61:8006', image: proxmoxIcon, category: 'internal' },
    { name: 'iDRAC', url: 'https://192.168.1.60', image: "https://pngimg.com/uploads/server/server_PNG39.png", category: 'internal' },
    { name: 'Home Assistant', url: 'http://hosting.local:8123', image: haIcon, category: 'internal' },
    { name: 'OpenMediaVault', url: 'http://openmediavault.local', image: openmediavaultIcon, category: 'internal' },
    { name: 'Prusa Octoprint', url: 'http://prusa.local', image: "https://octoprint.org/assets/img/logo.png", category: 'internal' },
    { name: 'Creality Octoprint', url: 'http://octopi.local', image: "https://octoprint.org/assets/img/logo.png", category: 'internal' },
    { name: 'qBittorrent', url: 'http://hosting.local:8080/', image: qbittorrentIcon, category: 'internal' },
    { name: 'Sonarr', url: 'http://hosting.local:8989', image: sonarrIcon, category: 'internal' },
    { name: 'Radarr', url: 'http://hosting.local:7878', image: radarrIcon, category: 'internal' },
    { name: 'Prowlarr', url: 'http://hosting.local:9696', image: prowlarrIcon, category: 'internal' },
    // Public Apps
    { name: 'BookStack', url: 'https://bookstack.cforsythe.me', image: "https://avatars.githubusercontent.com/u/20912696?s=200&v=4", category: 'public' },
    { name: 'Overseerr', url: 'https://watch.cforsythe.me', image: overseerrIcon, category: 'public' },
    { name: 'Plex', url: 'https://hosting.local:32400', image: plexIcon, category: 'public' },
    { name: 'AMP', url: 'https://minecraft.cforsythe.me', image: "https://avatars.githubusercontent.com/u/9978589?s=200&v=4", category: 'public' },
    { name: 'Mealie', url: 'https://mealie.cforsythe.me', image: mealieIcon, category: 'public' },
];