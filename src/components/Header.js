import logoHaxball from '../HBSE_files/top-tools/top-tools_play.png';
import logoHost from '../HBSE_files/top-tools/top-tools_host.png';
import logoNews from '../HBSE_files/top-tools/top-tools_news.png';
import logoHaxRacing from '../HBSE_files/top-tools/haxracing.png';

function Header(props) {

  return (
    <div className="header">
      <span className="title" id="globalTitle">HBSE v{props.version.version}</span>
      <a href="https://www.haxball.com/play" target="_blank" rel='noreferrer'>
        <img src={logoHaxball} alt="Haxball Play" className='header-logo' />HaxBall Play</a>
      <a href="https://www.haxball.com/headless" target="_blank" rel='noreferrer'>
        <img src={logoHost} alt='Headless Host' className='header-logo' />HaxBall Headless</a>
      <a href="http://blog.haxball.com/" target="_blank" rel='noreferrer'>
        <img src={logoNews} alt='Haxball News' className='header-logo' />HaxBall News</a>
      <a href="https://haxmaps.com" target="_blank" rel='noreferrer'>HaxMaps</a>
      <a href="https://discord.io/haxracing" target="_blank" rel='noreferrer'>
        <img src={logoHaxRacing} alt='Haxball Replay Analyzer' className='header-logoHax' />HaxRacing</a>
      <a href="https://haxball-replay-analyzer.github.io/" target="_blank" rel='noreferrer'>Replay Analyzer</a>
      <a href="https://github.com/haxball-stadium-editor/haxball-stadium-editor.github.io/issues" target="_blank" rel='noreferrer'>Report Bugs</a>
      <a href="https://kpias760.github.io/haxball-stadium-editor.github.io/old-version/" target="_blank" rel='noreferrer'>OLD VERSION</a>
    </div>
  );
}

export default Header;