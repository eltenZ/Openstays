import React from 'react'
import { Header } from '../components/layout/Header'
import { Sidebar } from '../components/layout/Sidebar'
import { Dashboard } from './Dashboard'
import { CreateHolidayModal } from '../components/modals/CreateHolidayModal'

class Inquiries extends React.Component {
  constructor(props) {
    super(props)
    this.sectionRefs = {
      reservation: React.createRef(),
      selections: React.createRef(),
      payments: React.createRef(),
      notifications: React.createRef(),
      groupChat: React.createRef(),
      // Add more as needed
    };
    this.state = {
      isSidebarOpen: false,
      showCreateModal: false,
      currentHoliday: {
        id: '1',
        title: "Mwangi's Coastal Escape",
        location: 'Diani Beach',
        description:
          'Group holiday for a luxurious yet budget-conscious getaway on the Kenyan coast.',
        date: '25th July 2025',
        participants: ['Mwangi', 'Amina', 'Juma', 'Karanja'],
      },
    }

    this.toggleSidebar = this.toggleSidebar.bind(this)
    this.openCreateModal = this.openCreateModal.bind(this)
    this.closeCreateModal = this.closeCreateModal.bind(this)
    this.handleCreateHoliday = this.handleCreateHoliday.bind(this)
  }

  toggleSidebar() {
    this.setState((state) => ({
      isSidebarOpen: !state.isSidebarOpen,
    }))
  }

  openCreateModal() {
    this.setState({ showCreateModal: true })
  }

  closeCreateModal() {
    this.setState({ showCreateModal: false })
  }

  handleCreateHoliday(holidayData) {
    this.setState({
      currentHoliday: holidayData,
      showCreateModal: false,
    })
  }
    handleSidebarNav = (section) => {
    const ref = this.sectionRefs[section];
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Optionally, close sidebar on mobile
      this.setState({ isSidebarOpen: false });
    }
  };

  render() {
    const { isSidebarOpen, showCreateModal, currentHoliday } = this.state

    return (
      <div className="flex flex-col h-screen bg-white">
        <Header
          toggleSidebar={this.toggleSidebar}
          holidayName={currentHoliday.title}
          onCreateHoliday={this.openCreateModal}
        />

        <div className="flex flex-1 overflow-hidden">
          <Sidebar
            isOpen={isSidebarOpen}
            closeSidebar={() => this.setState({ isSidebarOpen: false })}
            onNav={this.handleSidebarNav}
          />

          <main className="flex-1 overflow-y-auto p-4 md:p-6">
            <Dashboard holiday={this.state.currentHoliday} sectionRefs={this.sectionRefs} />
          </main>
        </div>

        {showCreateModal && (
          <CreateHolidayModal
            onClose={this.closeCreateModal}
            onCreate={this.handleCreateHoliday}
          />
        )}
      </div>
    )
  }
}

export default Inquiries
