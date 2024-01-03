import React, { useState } from 'react'
import styled from 'styled-components'
import NewPlaylist from './NewPlaylist.jsx'

export default function PlaylistOptions({ playlistName, data, accessToken, tracks, setError }) {
  const [songType, setSongType] = useState()

  return (
    <>
      {!songType ?
        <Container>
          <H1>What kind of playlist do you want to create?</H1>
          <Options>
            <Option onClick={() => setSongType("Happy")}>
              <SVG viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M19.5 12C19.5 16.1421 16.1421 19.5 12 19.5C7.85786 19.5 4.5 16.1421 4.5 12C4.5 7.85786 7.85786 4.5 12 4.5C16.1421 4.5 19.5 7.85786 19.5 12ZM21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12ZM9.375 10.5C9.99632 10.5 10.5 9.99632 10.5 9.375C10.5 8.75368 9.99632 8.25 9.375 8.25C8.75368 8.25 8.25 8.75368 8.25 9.375C8.25 9.99632 8.75368 10.5 9.375 10.5ZM15.75 9.375C15.75 9.99632 15.2463 10.5 14.625 10.5C14.0037 10.5 13.5 9.99632 13.5 9.375C13.5 8.75368 14.0037 8.25 14.625 8.25C15.2463 8.25 15.75 8.75368 15.75 9.375ZM12 15C10.1783 15 9 13.8451 9 12.75H7.5C7.5 14.9686 9.67954 16.5 12 16.5C14.3205 16.5 16.5 14.9686 16.5 12.75H15C15 13.8451 13.8217 15 12 15Z"></path> </g></SVG>
              <Span>Positive vibes</Span>
            </Option>
            <Option onClick={() => setSongType("Sad")}>
              <SVG viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM7.99979 13.7161C7.99979 14.5393 7.33239 15.2067 6.50911 15.2067C5.68583 15.2067 5.01843 14.5393 5.01843 13.7161C5.01843 12.8928 6.50911 10.7347 6.50911 10.7347C6.50911 10.7347 7.99979 12.8928 7.99979 13.7161ZM14.0333 17.2558C14.173 17.7836 14.7113 18.1027 15.2425 17.9699C15.7783 17.8359 16.1041 17.293 15.9701 16.7572C15.5311 15.0012 13.7167 13.9998 12 13.9998C10.2147 13.9998 8.54762 15.0116 8.02985 16.7597C7.8959 17.2955 8.22166 17.8359 8.75746 17.9699C9.28872 18.1027 9.827 17.7836 9.96665 17.2558C10.2278 16.3851 11.1602 15.9998 12 15.9998C12.8398 15.9998 13.7722 16.3851 14.0333 17.2558ZM10.5 10C10.5 10.8284 9.82843 11.5 9 11.5C8.17157 11.5 7.5 10.8284 7.5 10C7.5 9.17157 8.17157 8.5 9 8.5C9.82843 8.5 10.5 9.17157 10.5 10ZM15 11.5C15.8284 11.5 16.5 10.8284 16.5 10C16.5 9.17157 15.8284 8.5 15 8.5C14.1716 8.5 13.5 9.17157 13.5 10C13.5 10.8284 14.1716 11.5 15 11.5Z"></path> </g></SVG>
              <Span>Sad songs</Span>
            </Option>
            <Option onClick={() => setSongType("Accoustic")}>
              <SVG fill="#ffffff" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 511.999 511.999" xmlSpace="preserve"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M273.48,238.486c-24.205-24.206-63.382-24.208-87.589,0c-24.205,24.204-24.208,63.381,0,87.589 c24.205,24.205,63.381,24.208,87.589,0C297.629,301.927,297.629,262.635,273.48,238.486z M249.878,302.474 c-11.159,11.16-29.225,11.162-40.387,0c-11.161-11.162-11.162-29.225,0-40.388c11.163-11.162,29.226-11.161,40.387,0 C261.014,273.221,261.014,291.339,249.878,302.474z"></path> </g> </g> <g> <g> <path d="M494.987,16.979C484.038,6.03,469.48,0,453.997,0c-15.483,0-30.04,6.03-40.99,16.979l-22.761,22.762 c-7.539,7.539-10.132,18.177-7.782,27.85l-96.621,96.621c-40.014-21.625-88.903-22.563-119.686,8.22 c-8.608,8.608-15.015,18.979-19.045,30.825c-3.809,11.198-13.903,18.868-25.713,19.538c-32.346,1.836-62.27,14.955-84.256,36.942 c-53.375,53.376-48.555,145.044,10.744,204.343c30.453,30.453,71.28,47.919,112.013,47.92c0.002,0,0.002,0,0.004,0 c35.563,0,68.353-13.203,92.326-37.176c21.986-21.986,35.107-51.91,36.942-84.257c0.67-11.811,8.339-21.904,19.538-25.712 c11.845-4.03,22.217-10.436,30.826-19.045c31.248-31.25,29.519-80.126,8.191-119.657l96.638-96.638 c9.651,2.346,20.259-0.19,27.862-7.795l22.762-22.762C517.589,76.356,517.589,39.58,494.987,16.979z M315.934,322.208 c-4.962,4.962-11.009,8.678-17.972,11.047c-24.138,8.21-40.668,29.965-42.114,55.421c-1.391,24.502-10.802,46.13-27.219,62.547 c-40.737,40.736-111.262,35.136-157.143-10.744c-46.286-46.286-51.105-116.779-10.744-157.142 c16.417-16.417,38.045-25.829,62.547-27.219c25.456-1.445,47.21-17.974,55.421-42.114c2.369-6.964,6.086-13.01,11.047-17.972 c24.621-24.62,73.53-16.043,107.875,18.302C332.22,248.925,340.408,297.734,315.934,322.208z M328.345,198.331 c-4.683-5.345-9.737-10.35-14.709-14.712l89.398-89.398l14.71,14.71L328.345,198.331z M471.386,75.357L451.38,95.362 l-34.777-34.777l20.005-20.006c4.645-4.645,10.821-7.203,17.389-7.203c6.569,0,12.744,2.558,17.389,7.203 C480.974,50.167,480.974,65.769,471.386,75.357z"></path> </g> </g> <g> <g> <path d="M166.799,412.023l-66.857-66.857c-6.516-6.517-17.083-6.517-23.601,0c-6.517,6.517-6.517,17.083,0,23.601l66.857,66.857 c6.516,6.517,17.083,6.518,23.601,0C173.317,429.107,173.317,418.541,166.799,412.023z"></path> </g> </g> </g></SVG>
              <Span>Accoustic</Span>
            </Option>
            <Option onClick={() => setSongType("Energetic")}>
              <SVG fill="#ffffff" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512.149 512.149" xmlSpace="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g transform="translate(-1)"> <g> <g> <path d="M504.427,111.44l-1.253-1.254c-11.776-11.776-30.967-11.802-42.814,0.035l-46.089,46.574 c-2.428,2.436-6.312,2.534-8.845,0.203l-64.618-59.657c-6.276-5.8-14.442-8.987-22.996-8.987h-96.124 c-2.269,0-4.44,0.865-6.082,2.419l-81.47,77.356c-11.935,11.944-12.756,31.197-1.818,42.92 c5.844,6.268,13.736,9.719,22.219,9.719h0.15c8.413-0.044,16.499-3.619,22.087-9.728l57.538-60.893h20.595L120.63,300.218H37.81 c-19.633,0-35.778,14.68-36.758,33.421c-0.521,9.79,2.904,19.094,9.64,26.191c6.638,7,15.969,11.008,25.618,11.008h123.586 c2.436,0,4.767-1.006,6.444-2.798l63.32-67.593l53.248,55.684l-16.075,102.735c-4.052,17.02,4.114,34.357,19.412,41.198 c4.714,2.119,9.719,3.178,14.698,3.178c5.358,0,10.69-1.227,15.598-3.655c9.481-4.696,16.296-13.285,18.776-23.967 l27.463-147.306c0.53-2.86-0.38-5.809-2.445-7.865l-73.295-73.198l58.227-58.138l40.589,40.58 c11.335,11.335,31.091,11.335,42.417,0l76.156-76.147c5.623-5.623,8.722-13.109,8.722-21.054 C513.149,124.54,510.05,117.063,504.427,111.44z"></path> <path d="M407.065,114.837c29.211,0,52.966-23.755,52.966-52.966c0-29.211-23.755-52.966-52.966-52.966 c-29.21,0-52.966,23.755-52.966,52.966C354.1,91.082,377.855,114.837,407.065,114.837z"></path> </g> </g> </g> </g></SVG>
              <Span>Energetic songs</Span>
            </Option>
            <Option onClick={() => setSongType("Instrumental")}>
              <SVG viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M2 8.5C2 4.91015 4.91015 2 8.5 2C12.0899 2 15 4.91015 15 8.5V9.00818C15 9.32411 15.2442 9.58632 15.5593 9.60883L16.4275 9.67084C19.5673 9.89512 22 12.5078 22 15.6556V16V21C22 22.1046 21.1046 23 20 23H4C2.89543 23 2 22.1046 2 21V16V8.5ZM8.5 4C6.01472 4 4 6.01472 4 8.5V15H8H12H16H19.9464C19.6499 13.2048 18.1557 11.7994 16.285 11.6658L15.4168 11.6037C14.055 11.5065 13 10.3734 13 9.00818V8.5C13 6.01472 10.9853 4 8.5 4ZM20 17H17V19C17 19.5523 16.5523 20 16 20C15.4477 20 15 19.5523 15 19V17H13V19C13 19.5523 12.5523 20 12 20C11.4477 20 11 19.5523 11 19V17H9V19C9 19.5523 8.55228 20 8 20C7.44772 20 7 19.5523 7 19V17H4V21H20V17Z"></path> </g></SVG>
              <Span>Instrumental</Span>
            </Option>
            <Option onClick={() => setSongType("Live")}>
              <SVG fill="#ffffff" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12.788 14.371l-6.907 8.976c0.101 0.426 0.209 0.781 0.333 1.083-2.059 0.809-3.52 3.937-2.168 5.715 1.078 0.745 1.645 0.306 2.187 0.046-0.413-1.264-1.068-2.727 1.748-4.064 0.238 0.099 0.501 0.193 0.797 0.292l9.552-7.866-0.469 0.365c-2.91-0.133-4.674-1.851-5.073-4.546zM19.684 3.406c-0.942 1.066-1.518 2.463-1.532 3.994l-0-0-4.923 6.398c0.337 2.815 2.117 4.617 5.101 4.754l6.047-4.979c1.774-0.031 3.364-0.817 4.462-2.051l-0.064 0.062c-4.857-0.129-8.377-2.101-9.091-8.177zM17.514 15.302l-0.908-0.822 1.962-2.167 0.908 0.822-1.962 2.167zM24.267 1.339c-1.593 0-3.043 0.609-4.131 1.607 0.704 6.060 4.192 8.047 9.015 8.196 0.775-1.025 1.234-2.301 1.234-3.685 0-0.001 0-0.002 0-0.002-0.001-3.378-2.74-6.116-6.118-6.115z"></path> </g></SVG>
              <Span>Live songs</Span>
            </Option>
            <Option onClick={() => setSongType("Major")}>
              <SVG viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10.0909 11.9629L19.3636 8.63087V14.1707C18.8126 13.8538 18.1574 13.67 17.4545 13.67C15.4964 13.67 13.9091 15.096 13.9091 16.855C13.9091 18.614 15.4964 20.04 17.4545 20.04C19.4126 20.04 21 18.614 21 16.855C21 16.855 21 16.8551 21 16.855L21 7.49236C21 6.37238 21 5.4331 20.9123 4.68472C20.8999 4.57895 20.8852 4.4738 20.869 4.37569C20.7845 3.86441 20.6352 3.38745 20.347 2.98917C20.2028 2.79002 20.024 2.61055 19.8012 2.45628C19.7594 2.42736 19.716 2.39932 19.6711 2.3722L19.6621 2.36679C18.8906 1.90553 18.0233 1.93852 17.1298 2.14305C16.2657 2.34086 15.1944 2.74368 13.8808 3.23763L11.5963 4.09656C10.9806 4.32806 10.4589 4.52419 10.0494 4.72734C9.61376 4.94348 9.23849 5.1984 8.95707 5.57828C8.67564 5.95817 8.55876 6.36756 8.50501 6.81203C8.4545 7.22978 8.45452 7.7378 8.45455 8.33743V16.1307C7.90347 15.8138 7.24835 15.63 6.54545 15.63C4.58735 15.63 3 17.056 3 18.815C3 20.574 4.58735 22 6.54545 22C8.50355 22 10.0909 20.574 10.0909 18.815C10.0909 18.815 10.0909 18.8151 10.0909 18.815L10.0909 11.9629Z"></path> </g></SVG>
              <Span>Songs in major key</Span>
            </Option>
            <Option onClick={() => setSongType("Minor")}>
              <SVG viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M13.75 2C13.75 1.58579 13.4142 1.25 13 1.25C12.5858 1.25 12.25 1.58579 12.25 2V14.5359C11.4003 13.7384 10.2572 13.25 9 13.25C6.37665 13.25 4.25 15.3766 4.25 18C4.25 20.6234 6.37665 22.75 9 22.75C11.6234 22.75 13.75 20.6234 13.75 18V6.243C14.9875 7.77225 16.8795 8.75 19 8.75C19.4142 8.75 19.75 8.41421 19.75 8C19.75 7.58579 19.4142 7.25 19 7.25C16.1005 7.25 13.75 4.8995 13.75 2Z"></path> </g></SVG>
              <Span>Songs in minor key</Span>
            </Option>
            <Option onClick={() => setSongType("Danceable")}>
              <SVG fill="#ffffff" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M20 2L20 5C20 6.6449698 21.35503 8 23 8L24 8L24 16.033203C21.845713 16.169586 19.809892 16.740001 17.972656 17.640625 A 1.0001544 1.0001544 0 1 0 18.851562 19.4375C19.813513 18.965946 20.835305 18.602965 21.900391 18.357422C21.337575 21.880329 21 26.67855 21 32C21 32.663628 21.024861 33.281828 21.035156 33.927734C19.64273 33.879974 18.31422 33.807889 17.058594 33.714844C17.044208 33.387661 17.023771 33.064419 17.017578 32.732422 A 1.0001 1.0001 0 0 0 15.984375 31.738281 A 1.0001 1.0001 0 0 0 15.017578 32.771484C15.022341 33.026809 15.039537 33.274591 15.048828 33.527344C13.55407 33.378286 12.204925 33.202743 11.050781 32.998047C11.027483 32.66713 11 32.336941 11 32C11 31.86925 11.019427 31.687304 11.029297 31.439453 A 1.0001 1.0001 0 0 0 10.054688 30.384766 A 1.0001 1.0001 0 0 0 9.03125 31.359375C9.0251147 31.513524 9 31.72475 9 32C9 34.33617 9.5147053 36.550244 10.417969 38.552734 A 1.0001 1.0001 0 0 0 10.554688 38.833984C12.144964 42.182308 14.856917 44.886652 18.210938 46.466797 A 1.0001759 1.0001759 0 0 0 18.378906 46.548828C20.399427 47.471879 22.636829 48 25 48C27.23247 48 29.361333 47.538629 31.292969 46.710938 A 1.0001 1.0001 0 1 0 30.505859 44.873047C29.736955 45.202517 28.929514 45.455795 28.097656 45.644531C28.277668 44.518142 28.420438 43.200611 28.550781 41.837891C29.460418 41.756668 30.352262 41.649967 31.214844 41.511719 A 1.0001 1.0001 0 1 0 30.898438 39.537109C30.194124 39.649992 29.466061 39.737402 28.726562 39.810547C28.814215 38.5745 28.885131 37.285404 28.929688 35.929688C30.612938 35.874366 32.213825 35.784981 33.707031 35.664062 A 1.0001 1.0001 0 0 0 34.287109 35.605469C35.862636 35.466232 37.351969 35.305167 38.628906 35.101562C38.489587 35.701514 38.325116 36.292416 38.113281 36.863281 A 1.0001 1.0001 0 1 0 39.988281 37.558594C40.629388 35.830901 41 33.960704 41 32C41 25.627451 37.2484 20.131992 31.845703 17.560547 A 1.0001 1.0001 0 0 0 31.550781 17.417969C29.837923 16.645578 27.967779 16.173192 26 16.050781L26 8L27 8C28.64497 8 30 6.6449698 30 5L30 2L20 2 z M 22 4L28 4L28 5C28 5.5650302 27.56503 6 27 6L23 6C22.43497 6 22 5.5650302 22 5L22 4 z M 8 13C8 13 10.5625 16.496219 11.6875 17.949219C10.5625 19.402219 8 22.898437 8 22.898438C8 22.898438 11.496219 20.335844 12.949219 19.214844C14.402219 20.335844 17.902344 22.898437 17.902344 22.898438C17.902344 22.898438 15.336844 19.402219 14.214844 17.949219C15.336844 16.496219 17.902344 13 17.902344 13C17.902344 13 14.402219 15.562594 12.949219 16.683594C11.496219 15.562594 8 13 8 13 z M 25 18C25.336941 18 25.66713 18.027483 25.998047 18.050781C26.201984 19.201959 26.376533 20.54706 26.525391 22.037109C26.020209 22.01864 25.515209 22 25 22C24.485304 22 23.977577 22.011659 23.474609 22.03125C23.623033 20.546723 23.79688 19.206332 24 18.058594C24.332081 18.034434 24.661464 18 25 18 z M 28.097656 18.353516C28.928447 18.540789 29.734764 18.79369 30.501953 19.121094C30.981472 20.151155 31.403785 21.313971 31.761719 22.582031C30.726915 22.400309 29.656615 22.256434 28.550781 22.160156C28.420397 20.797419 28.27771 19.48001 28.097656 18.353516 z M 33.296875 20.734375C34.429592 21.56928 35.428551 22.568625 36.263672 23.701172C35.529594 23.454451 34.757369 23.237631 33.958984 23.041016C33.762037 22.241949 33.543965 21.469013 33.296875 20.734375 z M 25 24C25.578812 24 26.148066 24.016139 26.712891 24.041016C26.806598 25.301504 26.879693 26.636562 26.927734 28.035156C26.281584 28.024874 25.66391 28 25 28C24.337716 28 23.713653 28.019874 23.072266 28.03125C23.120287 26.634627 23.193551 25.301854 23.287109 24.042969C23.852048 24.016984 24.421544 24 25 24 z M 28.726562 24.181641C29.965638 24.302668 31.159087 24.48041 32.289062 24.710938C32.519714 25.840331 32.697157 27.033111 32.818359 28.271484C31.580604 28.183672 30.287537 28.11684 28.929688 28.072266C28.885039 26.713181 28.814519 25.420437 28.726562 24.181641 z M 13 25C13 25 14.097875 26.937969 14.796875 28.042969C14.097875 29.116969 13 31 13 31C13 31 14.91 29.930094 16 29.246094C17.09 29.930094 19 31 19 31C19 31 17.902125 29.116969 17.203125 28.042969C17.902125 26.937969 19 25 19 25C19 25 17.09 26.124844 16 26.839844C14.91 26.124844 13 25 13 25 z M 34.416016 25.234375C35.68498 25.592178 36.848248 26.01633 37.878906 26.496094C38.206635 27.263775 38.459078 28.070966 38.646484 28.902344C37.519916 28.722117 36.202575 28.577611 34.839844 28.447266C34.743301 27.340218 34.598245 26.270217 34.416016 25.234375 z M 25 30C25.675872 30 26.305534 30.026001 26.962891 30.037109C26.974018 30.694449 27 31.32414 27 32C27 32.67586 26.974018 33.305527 26.962891 33.962891C26.305527 33.974018 25.67586 34 25 34C24.32414 34 23.694455 33.973998 23.037109 33.962891C23.025982 33.305527 23 32.67586 23 32C23 31.322124 23.025916 30.690514 23.037109 30.03125C23.689545 30.019564 24.32723 30 25 30 z M 28.964844 30.072266C30.363475 30.120241 31.698475 30.191508 32.958984 30.285156C32.983958 30.850596 33 31.420542 33 32C33 32.579994 32.965061 33.144887 32.9375 33.712891C31.682897 33.805867 30.355963 33.87995 28.964844 33.927734C28.975139 33.281828 29 32.663628 29 32C29 31.336372 28.97514 30.718155 28.964844 30.072266 z M 34.962891 30.472656C36.452978 30.621491 37.798127 30.797799 38.949219 31.001953C38.972517 31.33287 39 31.663059 39 32C39 32.336472 38.977465 32.667833 38.953125 32.998047C37.801918 33.20215 36.455698 33.376415 34.964844 33.525391C34.985895 33.022965 35 32.516135 35 32C35 31.48412 34.98144 30.97848 34.962891 30.472656 z M 11.353516 35.095703C12.483846 35.276651 13.805793 35.419912 15.173828 35.550781C15.269605 36.655614 15.405387 37.72947 15.585938 38.763672C14.316252 38.405495 13.152286 37.981998 12.121094 37.501953C11.793447 36.734194 11.540819 35.927153 11.353516 35.095703 z M 17.199219 35.726562C18.431964 35.814022 19.718618 35.883201 21.070312 35.927734C21.114959 37.286881 21.185483 38.579503 21.273438 39.818359C20.039225 39.697629 18.850646 39.520486 17.724609 39.291016C17.494794 38.160203 17.319798 36.96644 17.199219 35.726562 z M 23.072266 35.964844C23.718427 35.975169 24.336078 36 25 36C25.663628 36 26.281828 35.975139 26.927734 35.964844C26.879691 37.363522 26.8066 38.69842 26.712891 39.958984C26.148662 39.984262 25.578783 40 25 40C24.421202 40 23.851923 39.983902 23.287109 39.958984C23.1934 38.69842 23.120309 37.363522 23.072266 35.964844 z M 33 38.101562C33 38.101562 35.5625 41.597781 36.6875 43.050781C35.5625 44.503781 33 48 33 48C33 48 36.496219 45.437406 37.949219 44.316406C39.402219 45.438406 42.902344 48 42.902344 48C42.902344 48 40.336844 44.503781 39.214844 43.050781C40.335844 41.597781 42.902344 38.101563 42.902344 38.101562C42.902344 38.101562 39.402219 40.664156 37.949219 41.785156C36.496219 40.663156 33 38.101563 33 38.101562 z M 13.734375 40.296875C14.470697 40.544532 15.245838 40.761705 16.046875 40.958984C16.241959 41.754714 16.454094 42.529779 16.699219 43.261719C15.567575 42.426922 14.568739 41.428858 13.734375 40.296875 z M 18.234375 41.416016C19.270817 41.598351 20.341493 41.743297 21.449219 41.839844C21.579602 43.202612 21.722285 44.520126 21.902344 45.646484C21.071553 45.459211 20.265236 45.20631 19.498047 44.878906C19.018025 43.847636 18.591199 42.687472 18.234375 41.416016 z M 23.474609 41.962891C23.979801 41.981393 24.484779 42 25 42C25.514066 42 26.021894 41.989768 26.525391 41.970703C26.376682 43.457676 26.201622 44.800314 25.998047 45.949219C25.667275 45.972675 25.337022 46 25 46C24.663059 46 24.33287 45.972517 24.001953 45.949219C23.798023 44.798311 23.623468 43.452972 23.474609 41.962891 z"></path></g></SVG>
              <Span>Danceable songs</Span>
            </Option>
            <Option onClick={() => setSongType("Loudest")}>
              <SVG fill="#ffffff" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 396.802 396.802" xmlSpace="preserve" ><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g id="Layer_5_69_"> <g> <g> <path d="M200.361,312.663c0,9.324-6.564,13.065-14.587,8.316L93.292,275.01c-8.023-4.75-14.587-16.263-14.587-25.586V147.38 c0-9.322,6.564-20.836,14.587-25.585l92.482-45.969c8.023-4.75,14.587-1.007,14.587,8.316V312.663z"></path> <path d="M57.308,249.69c0,9.324-7.628,16.952-16.951,16.952H16.951C7.628,266.642,0,259.014,0,249.69V147.116 c0-9.323,7.628-16.951,16.951-16.951h23.406c9.323,0,16.951,7.628,16.951,16.951V249.69z"></path> </g> <path d="M274.516,291.944c22.353-25.472,34.887-58.256,35.295-92.315c0.408-33.999-11.284-67.023-32.92-92.989 c-0.582-0.695-1.188-1.362-1.802-1.977c-5.365-5.365-10.735-6.15-14.732-2.155l-12.356,12.357 c-6.536,6.536-1.745,11.866,0.557,14.428c0.296,0.329,0.574,0.639,0.811,0.926c32.753,39.693,32.411,97.033-0.815,136.34 l-0.319,0.373c-1.968,2.294-6.579,7.663-0.575,13.668l12.979,12.977c2.235,2.236,4.478,3.324,6.666,3.233 c3.198-0.134,5.335-2.658,6.75-4.329C274.217,292.29,274.37,292.11,274.516,291.944z"></path> <path d="M396.789,200.786c0.602-56.983-19.721-111.779-57.222-154.288c-0.246-0.281-0.511-0.586-0.789-0.91 c-0.851-0.987-1.815-2.107-2.9-3.193c-4.965-4.964-9.33-5.637-12.97-1.996l-13.697,13.698 c-5.943,5.942,0.546,13.363,4.034,17.349l0.667,0.767c63.563,73.822,62.121,183.904-3.356,256.059 c-2.038,2.245-7.452,8.212-1.873,13.791l14.475,14.474c1.477,1.478,3.148,2.208,4.968,2.172c3.342-0.066,6.143-2.69,7.957-4.658 C374.629,312.289,396.188,257.859,396.789,200.786z"></path> </g> </g> </g> </g></SVG>
              <Span>Loudest songs</Span>
            </Option>
            <Option onClick={() => setSongType("Fastest")}>
              <SVG fill="#ffffff" viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M 29.3459 49.1765 C 30.6543 49.1765 31.7945 48.5597 34.2618 48.5597 C 36.7292 48.5597 37.4018 49.1765 39.2335 49.1765 C 42.0001 49.1765 43.4582 48.0176 43.4582 46.0924 C 43.4582 42.8027 39.8694 40.5971 34.2431 40.5971 C 31.4767 40.5971 30.2244 40.8587 28.6730 41.2513 L 26.6542 36.6531 C 24.6542 32.2419 21.4767 29.3634 16.9533 29.3634 L 14.7477 29.3634 C 14.0187 29.3634 13.5327 29.0456 13.5327 28.3353 C 13.5327 27.1765 15.0841 26.8961 16.7851 26.8961 C 22.2430 26.8961 26.2991 29.9054 28.7664 35.9615 L 30.0374 39.0830 C 31.3085 38.8213 32.6730 38.6905 34.0562 38.6905 C 35.1590 38.6905 36.1684 38.7653 37.2338 38.9148 C 38.3554 38.0737 39.6638 37.1952 41.5514 36.3727 C 43.6450 37.7933 46.0188 38.7092 48.5234 38.7092 C 53.6825 38.7092 56.0000 37.5877 56.0000 32.7092 C 56.0000 26.8213 51.7382 22.4101 46.0750 22.4288 L 41.0469 15.7559 C 38.2245 12.0923 34.8786 10.3353 31.5701 10.3353 C 28.8412 10.3353 24.7851 11.9054 24.7851 14.1110 C 24.7851 15.6064 27.8131 17.6998 30.1496 19.1391 L 40.9160 25.7185 C 40.0749 26.5223 39.3086 26.9522 38.3925 26.9522 C 36.9348 26.9522 35.4392 26.0737 33.1777 24.7653 C 27.4019 21.4382 22.9720 18.3167 16.9907 18.3167 C 10.7664 18.3167 6.0374 21.8867 3.5140 28.8400 C 1.5140 28.8400 0 30.1485 0 32.0737 C 0 34.2419 1.7196 35.6064 4.0748 35.6064 C 6.8038 39.4195 11.2711 40.9522 16.5608 40.9522 C 16.8412 40.9522 17.1215 40.9335 17.4019 40.9335 L 24.9720 47.2139 C 26.8412 48.9148 27.9253 49.1765 29.3459 49.1765 Z M 48.0936 31.8120 C 47.2525 31.8120 46.5796 31.1017 46.5796 30.2793 C 46.5796 29.4382 47.2713 28.6905 48.1123 28.6905 C 48.9721 28.6905 49.6263 29.3634 49.6263 30.2045 C 49.6263 31.0456 48.9346 31.8120 48.0936 31.8120 Z M 15.8318 50.6531 C 19.4393 50.6531 21.6262 49.9616 23.4206 48.7279 L 17.6449 43.9055 C 17.3832 43.9242 17.0655 43.9616 16.6729 43.9616 C 15.7383 43.9616 14.3552 43.6812 12.7103 43.6812 C 10.6168 43.6812 9.3271 44.8027 9.3271 46.4849 C 9.3271 48.9896 11.8692 50.6531 15.8318 50.6531 Z"></path></g></SVG>
              <Span>Fastest songs</Span>
            </Option>
            <Option onClick={() => setSongType("Slowest")}>
              <SVG fill="#ffffff" version="1.2" baseProfile="tiny" id="_x31_" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 256 175" xmlSpace="preserve" ><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M185,29.7v0.2l15-12.6c-11.4-6.1-23.9-9.5-37.5-9.5s-26.2,3.4-37.1,9.3l15,12.6L185,29.7L185,29.7z M105.1,93.2 c-24.7,0-45,20.3-45,45v4.5l0,0c0.2,9.5,7.9,17,17.4,17s17.2-7.5,17.4-17l0,0v-4.5c0-5.7,4.5-10.1,10.1-10.1 c9.7,0,17.6-7.9,17.6-17.6S114.8,93.2,105.1,93.2z M221.9,92.8c-9.7,0-17.6,7.9-17.6,17.6v32.4l0,0c0.4,9.3,7.9,16.8,17.4,16.8 s17-7.5,17.4-16.8l0,0v-32.7C239.3,100.5,231.4,92.8,221.9,92.8z M252.7,101.9c0-4.3-1.4-8.5-3.4-12c-2.2,1.6-4.7,2.6-7.7,2.6 c4.1,4.9,6.5,11,6.5,17.6v5.5C251.3,111.8,252.7,107,252.7,101.9z M131.7,110.6c0,5.7-1.8,10.7-4.7,15c11.6,2.6,23.5,4.1,35.7,4.1 c11.4,0,22.1-1.2,32.7-3.4v-16c0-6.5,2.4-12.6,6.3-17h-76.5C129,98,131.7,103.9,131.7,110.6z M125,93.4L125,93.4c0.2,0,0-0.2,0-0.2 V93.4z M245.8,79.6c0-2.4-2-4.7-4.5-4.7h-0.6c-3.4-21.7-15.4-40.6-32.7-52.5l-17.6,14.8c9.7,11.4,16.4,24.1,20.3,37.9h-9.5 c-4.3-13-11.4-25.6-21.5-35.9h-32.9c-10.1,10.5-17,22.7-21.5,35.9h-9.5c3.9-13.4,10.3-26,19.9-36.9l-18.5-15.6 c-17,12.2-29.4,30.8-32.7,52.5h-1.2c-2.4,0-4.5,2-4.5,4.5c0,2.4,2,4.5,4.5,4.5h157.8C243.8,84.1,245.8,82,245.8,79.6z M81.6,89.5 c-4.9-0.6-8.9-4.7-8.9-9.9v-8.9c0-18.7-15-33.9-33.9-33.9c-18.7,0-33.9,15-33.9,33.9v8.9c0,4.9,4.1,8.9,8.9,8.9h24.5 c2.2,11.4,8.5,20.7,17.6,27.4C61.1,104.3,70.2,95.2,81.6,89.5z M24.2,64.4c-3,0-5.7-2.4-5.7-5.7c0-3,2.4-5.7,5.7-5.7 s5.7,2.4,5.7,5.7C29.8,61.9,27.4,64.4,24.2,64.4z"></path> </g></SVG>
              <Span>Slowest songs</Span>
            </Option>
          </Options>
        </Container>
        :
        <NewPlaylist tracks={tracks.items} songType={songType} playlistName={playlistName} data={data} accessToken={accessToken} setError={setError} />
      }
    </>
  )
}

const Container = styled.div`
display: flex;
flex-direction: column;
text-wrap: wrap;
max-width: 100%;
`
const Options = styled.div`
display: flex;
flex-wrap: wrap;
gap: 20px;
width: 1180px;
margin: 0 auto;

@media screen and (max-width: 1200px) {
  width: 790px;
}

@media screen and (max-width: 800px) {
  width: 580px;
}

@media screen and (max-width: 600px) {
  width: 380px;
  max-width: 100%;
}
`
const Option = styled.div`
width: 180px;
height: 180px;
border: 5px solid white;
border-radius: 15px;
padding: 10px 20px;
cursor: pointer;
font-size: 1.3rem;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;

&:hover {
  border-color: #148255;
  color: #148255;

  svg {
    fill: #148255;
  }
  }

@media screen and (max-width: 400px) {
  width: 80%;
  margin: 0 auto;
}
`
const SVG = styled.svg`
width: 90px;
fill: #ffffff;

&:hover {
fill: #148255;
}
`
const H1 = styled.h1``
const Span = styled.span``