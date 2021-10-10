import styled from 'styled-components';

export const MainHeader = styled.div`
  height: 100px;
  border-bottom: 1px solid #79bd9a;
`;

export const MainHeaderItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
  border-bottom: 1px solid #a7a7a7;
`;

export const MainHeaderLeftItems = styled.div`
  display: flex;
`;

export const MainHeaderTitle = styled.h4`
  color: #454545;
  line-height: 40px;
`;

export const MainBody = styled.div`
  display: flex;
  flex-direction: row-reverse;
  margin-top: 30px;
  gap: 40px 40px;
  @media only screen and (max-width: 767px) {
    flex-direction: column;
  }
`;

export const FolderSection = styled.div`
  flex: 3;
  box-shadow: 3px 3px 10px #6d6d6d;
  @media only screen and (max-width: 767px) {
    width: 100%;
  }
`;

export const SearchSection = styled.div`
  flex: 2;
  @media only screen and (max-width: 767px) {
    width: 100%;
  }
`;

export const SearchContent = styled.div`
  padding-top: 70px;

  border-radius: 10px;
  background: #fff;
  box-shadow: 3px 3px 10px #6d6d6d;
  position: -webkit-sticky;
  position: sticky;
  top: 0;
`;

export const SearchFieldWrapper = styled.div`
  width: 90%;
  margin: 0 auto;
`;

export const NotFoundText = styled.p`
  text-align: center;
  margin: 70px 0;
  color: #454545;
  font-size: 18px;
`;

export const SearchResultInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const SearchResultCount = styled.p`
  color: #454545;
  font-size: 10px;
`;

export const SearchQueryParamsTexts = styled.div``;

export const SearchQueryParamsText = styled.p`
  color: #454545;
  font-size: 10px;
`;

export const LoadingWrapper = styled.div`
  text-align: center;
  margin: 20px 0;
`;
