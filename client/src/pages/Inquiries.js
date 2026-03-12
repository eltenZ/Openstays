import React from 'react'
import { useLocation } from 'react-router-dom'  // <- needed to access booking data
import { Sidebar } from '../components/layout/Sidebar'
import { Dashboard } from './Dashboard'
import { CreateHolidayModal } from '../components/modals/CreateHolidayModal'

class Inquiries extends React.Component {
  constructor(props) {
    super(props)
    // Get booking data passed via navigate
    const bookingFromState = props.location?.state?.booking || null

    this.sectionRefs = {
      reservation: React.createRef(),
      
      payments: React.createRef(),
      
    };

    this.state = {
      isSidebarOpen: false,
      showCreateModal: false,
      currentHoliday: {
        id: bookingFromState ? bookingFromState.id : '1',
        title: bookingFromState ? bookingFromState.name : "Mwangi's Coastal Escape",
        location: bookingFromState ? bookingFromState.location : 'Diani Beach',
        description: bookingFromState
          ? `Booking from AccommodationDetails: ${bookingFromState.name}`
          : 'Group holiday for a luxurious yet budget-conscious getaway on the Kenyan coast.',
        date: bookingFromState ? bookingFromState.checkIn.toDateString() : '25th July 2025',
        participants: ['Mwangi', 'Amina', 'Juma', 'Karanja'],
        reservations: bookingFromState ? [bookingFromState] : []
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
      this.setState({ isSidebarOpen: false });
    }
  };

  render() {
    const { isSidebarOpen, showCreateModal, currentHoliday } = this.state

    return (
      <div className="flex flex-col h-screen bg-white">
       

        <div className="flex flex-1 overflow-hidden">
          <Sidebar
            isOpen={isSidebarOpen}
            closeSidebar={() => this.setState({ isSidebarOpen: false })}
            onNav={this.handleSidebarNav}
          />
          <main className="flex-1 overflow-y-auto p-4 md:p-6">
            {/* Pass booking data to Dashboard so it can display the initial reservation */}
            <Dashboard holiday={currentHoliday} sectionRefs={this.sectionRefs} />
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

// Wrap class component to access location
export default (props) => {
  const location = useLocation()
  return <Inquiries {...props} location={location} />
}
