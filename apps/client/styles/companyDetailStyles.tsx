import styled from 'styled-components';
import { Box } from '@material-ui/core';

export const BusinessTextBox = styled(Box)`
  margin-left: 0;
  margin-top: 16px;
  max-width: 450px;
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    margin-left: 24px;
    margin-top: 0;
  }
`;
export const BusinessInnerBox = styled(Box)`
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;
export const Separator = styled(Box)`
  align-items: center;
  background-color: #a13e3e;
  color: white;
  display: flex;
  justify-content: flex-end;
  padding: 24px;
`;
export const BusinessInfoItem = styled(Box)`
  margin-top: 24px;
  max-width: 615px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
export const Form = styled.form`
  display: flex;
  max-width: 300px;
  width: 100%;
  div {
    @media (min-width: 768px) {
      min-width: 262px;
    }
  }
  flex-direction: column;
`;
export const ConnectBusinessBox = styled(Box)`
  filter: drop-shadow(0px 12px 20px rgba(0, 0, 0, 0.6));
  max-width: 600px;
  justify-content: center;
  align-items: center;
  padding: 20px;
  border-radius: 4px;
  background-color: #424242;
  color: white;
  display: flex;

  flex-direction: column;
`;
export const TextBox = styled(Box)`
  margin-left: 20px;
`;

export const CoverImage = styled(Box)`
  color: white;
  display: flex;
  flex-direction: column;

  align-items: center;

  flex-wrap: wrap;
  justify-content: space-evenly;
  background: ${(props) => `url(${props.coverimage}) no-repeat center`};
  background-size: cover;
  max-width: 100vw;
  min-height: 300px;
  @media (min-width: 768px) {
  }

  @media (min-width: 970px) {
    flex-direction: row;
    justify-content: space-evenly;
  }

  filter: drop-shadow(0px 12px 20px rgba(0, 0, 0, 0.6));
`;

export const Wrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  background: #fff;
  position: relative;
  margin-bottom: 50px;
`;
export const ImageOuterCircle = styled.div`
  width: 200px;
  height: 200px;
  background: white;
  justify-content: center;
  align-items: center;
  display: flex;
  clip-path: circle(50%);
`;
export const ImageInnerCircle = styled.div`
  background: white;
  position: relative;
  width: 180px;
  height: 180px;
  clip-path: circle(50%);
  img {
    border-radius: 4px;
  }
`;
export const OpeningHours = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`;
export const CalendarWrapper = styled.div`
  position: relative;
  width: 90vw;
  max-width: 1000px;
  .rbc-header {
    width: 50px;
  }
  .rbc-time-view-resources .rbc-day-slot {
    min-width: 50px;
  }
  .rbc-toolbar-label {
    margin: 10px;
  }
  .rbc-toolbar {
    flex-direction: column;
    @media (min-width: 768px) {
      flex-direction: row;
      .rbc-toolbar-label {
        margin: 0;
      }
    }
  }
  margin: auto;
  .rbc-events-container {
    margin: 0;
  }
  .fc-timegrid-event-harness {
    cursor: pointer;
  }

  .rbc-time-slot {
    min-height: 30px;
    @media (min-width: 768px) {
      min-height: 50px;
    }
  }
  @media (max-width: 768px) {
    .rbc-time-view-resources .rbc-header,
    .rbc-time-view-resources .rbc-day-bg {
      width: 100%;
    }
    .rbc-time-view-resources .rbc-day-slot {
      min-width: 50px !important;
    }
  }
`;
export const CompanyContent = styled(Box)`
  flex-wrap: wrap;
  display: flex;
  justify-content: center;
  min-height: 60vh;
  margin: 5vw 5vw 5vw 5vw;
  @media (min-width: 930px) {
    margin: 5vw 8vw 5vw 8vw;
  }
`;
