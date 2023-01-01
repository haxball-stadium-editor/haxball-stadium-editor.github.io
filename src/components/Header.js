import logoHaxball from '../HBSE_files/top-tools/top-tools_play.png';
import logoHost from '../HBSE_files/top-tools/top-tools_host.png';
import logoNews from '../HBSE_files/top-tools/top-tools_news.png';
import logoGeneralFeed from '../HBSE_files/general/general_feed.png';
import logoHaxRacing from '../HBSE_files/top-tools/haxracing.png';

function Header() {

  return (
    <div className="header">
      <span class="title">HBSE v2.10</span>
      <a href="https://www.haxball.com/play" target="_blank" rel='noreferrer'>
        <img src={logoHaxball} alt="Haxball Play" className='header-logo' />HaxBall Play</a>
      <a href="https://www.haxball.com/headless" target="_blank" rel='noreferrer'>
        <img src={logoHost} alt='Headless Host' className='header-logo' />HaxBall Headless</a>
      <a href="http://blog.haxball.com/" target="_blank" rel='noreferrer'>
        <img src={logoNews} alt='Haxball News' className='header-logo' />HaxBall News</a>
      <a href="https://grandesligashaxball.wixsite.com/grandesligashaxball" target="_blank" rel='noreferrer'>
        <img src={logoGeneralFeed} alt='GLS' className='header-logo' />GLH HaxBall</a>
      <a href="https://discord.io/haxracing" target="_blank" rel='noreferrer'>
        <img src={logoHaxRacing} alt='Haxball Replay Analyzer' className='header-logoHax' />HaxRacing</a>
      <a href="https://haxball-replay-analyzer.github.io/" target="_blank" rel='noreferrer'>Replay Analyzer</a>
    </div>
  );
}

export default Header;