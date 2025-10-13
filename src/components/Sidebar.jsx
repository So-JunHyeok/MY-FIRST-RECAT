import './sidebar.css';


function Sidebar(){
    return(
        <div className="sidebar">
        <div className="sidebar-top">
            <div className="logo"><img className='logo_vector_tx' src='Vector.svg' /></div>

            <div className="new-chat">
            <img src="lucide_file-plus.svg" width="20" />
            <span>새 채팅</span>
            </div>
        </div>

        <div className="sidebar-middle">
            <h3>최근</h3>
            <div className="recent-item">2024년 월별 최고 기온 알려줘</div>
            <div className="recent-item">격포항 GNSS 측량방법</div>
        </div>

        <div className="sidebar-footer">
            v1.0.0 © Billion21
        </div>
        </div>



    );
}

export default Sidebar;